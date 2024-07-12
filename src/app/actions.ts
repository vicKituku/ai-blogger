'use server'
import OpenAI from 'openai'
import { supabase } from '@/lib/supabase'
import { decode } from 'base64-arraybuffer'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function createCompletion(prompt: string) {
  if (!prompt) {
    return { error: 'Prompt is required' }
  }
  const { userId } = auth()
  if (!userId) {
    return { error: 'user is not logged in' }
  }

  //generate a blog post using openai

  const messages: any = [
    {
      role: 'user',
      content: `Write a blog post around 200 words about the following topic: "${prompt}" in markdown format.`
    }
  ]

  const completions = await openai.chat.completions.create({
    model: 'gpt-4',
    messages
  })

  const content = completions?.choices?.[0]?.message?.content
  if (!content) {
    return { error: 'Unable to generate the blog content' }
  }

  //generate an image using dalle3
  const image = await openai.images.generate({
    model: 'dall-e-3',
    prompt: `Generate an image fro a blog post about "${prompt}"`,
    n: 1,
    size: '1792x1024',
    response_format: 'b64_json'
  })

  const imageName = `blog-${Date.now()}`
  const imageData = image?.data?.[0]?.b64_json as string
  if (!imageData) {
    return { error: 'Unable to generate blog image' }
  }

  //upload image to supabase storage

  const { data, error } = await supabase.storage
    .from('blogs')
    .upload(imageName, decode(imageData), { contentType: 'image/png' })
  if (error) {
    return { error: 'Unable to upload blog image to Storage' }
  }
  const path = data?.path
  const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/blogs/${path}`

  //create a new blog post in supabase

  const { data: blog, error: blogError } = await supabase
    .from('blog')
    .insert([{ title: prompt, content, imageUrl, userId: userId }])
    .select()

  if (blogError) {
    return { error: 'Unable to insert the blog into the database' }
  }

  const blogId = blog?.[0]?.id
  revalidatePath('/')
  redirect(`/blog/${blogId}`)
}
