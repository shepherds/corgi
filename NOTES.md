Issues:

1. Forgot password needs to be implemented (w/ email)
-Persist a reset key in your database along with a timestamp. 
-Create a route accepting the reset key and new password. 
-Verify the reset key's timestamp when applying the new password to the user.
-https://github.com/substack/node-password-reset

2. Check password strength = http://danielstudds.com/page/2/

3.? zxcvbn (check password score)?

4. Add data centers and servers as main routes on side navigation

5. Add "changeNav" from Archie for routes

6. Improve the look-n-feel of the admin menu

7. Profile (http://bootstrapmaster.com/live/genius/page-profile.html)
	- Side panel 

7. Users
	- Listing + filter + new user button: http://detail.herokuapp.com/user-list.html
	- No images but support gravatars
	- First, Last, email, Title, Signed Up, Last Logged In, ?
	- Permissions?

8. Groups
	- ?

8. Dashboards
	- New
	- Existing ones as boxes to click on
	- Creating a new one/publishing

9. Extensions Manager
	- http://teraworks/display/GF/Viewpoint+2.0+Add+Content
	- http://wrapbootstrap.com/preview/WB0B30DGR
	- Define extensions and create ping extension as first
	- Widgets + Monitoring stuff
		- Heatmap
		- Forecasting

10. Servers
	- FQDN, GROUPs, Data Center, Chasis, Cabinet
	- Initially need Login+Password for SSH support (Ping only then no)
	- Bulk import with CSV
	- Add new
	- Remove
	- Update
	- Table shows the basic info and basic resource utilization (latency, cpu, io, disk, etc..)
	- Click to drill in further
	- Timelapse views of data (fixed dashboard)

11. Data Centers
	- Similiar to the Svenson setup and functionality
	- Ability to dynamically add cabinets and components
	- Ability to partition tiles for planning
	- Load/Save

11. Services
	-

https://docs.newrelic.com/docs/windows-server-monitoring/server-monitor-installation-windows
https://docs.newrelic.com/docs/windows-server-monitoring/server-monitor-installation-windows
https://docs.newrelic.com/docs/windows-server-monitoring/server-monitoring-alerts
https://docs.newrelic.com/docs/features/alert-api-examples
SDK
REST API (token)