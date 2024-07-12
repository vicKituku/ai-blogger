import { authMiddleware } from '@clerk/nextjs/server'

export default authMiddleware({
  publicRoutes: () => true
})

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
