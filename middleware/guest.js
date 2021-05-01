// This middleware is used to block access unless user is authenticated
export default function ({ store, app, redirect, route }) {
  const hasToken = Boolean(app.$apolloHelpers.getToken())

  // If token expired, redirect to login page
  if (hasToken) {
    return redirect('/')
  }
}
