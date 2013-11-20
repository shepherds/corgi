TODO:
- Change '/' route on server-side to do check for settings.json, if not there then
  do a new EJS render of the wizard standalone HTML. If it is there then do an EJS
  render of the index file.


1. If user is authenticated at endpoint '/' forward to 'home'
2. Figure out how to protect all the endpoints of the application e.g. '/home', '/dashboard/45'
	* Don't initialize the routes until after a user has been verified
3. Trying to access '/home' when not authenticated should kick back to login page
4. Add error message to login form
5. Add validation before submitting login form, username, password are required
6. Need a new logo (use Etsy?)
7. Add logout code/handling
8. Pages
	A. Admin
		1. Use https://github.com/settings/profile as design for handling admin section
		2. Admin section must be secure. User must have admin role applied to access.
		3. Sections: Users, Groups, Servers, Services?, Data Centers, Widgets?, Package Manager, etc..
	B. Content
		1. Add a new dashboard form. Dashboard names must be unique, check against database.
		2. Notices on primary dashboard view.
		3. Drill-down to dashboard with routes: /dashboard/abc
		4. Adding content to a dashboard?
	C. Help
		1. Get some examples from wrap bootstrap panels
	D. Profile
