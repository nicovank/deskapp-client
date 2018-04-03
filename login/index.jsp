<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Reslife DeskApp | Staff Login</title>

		<link href="https://fonts.googleapis.com/css?family=Lato:400,700,900" rel="stylesheet"> 

		<link rel="stylesheet" href="/public/lib/kube/kube.css" />
		<link rel="stylesheet" href="index.css" />
	</head>
	<body>
		<div id="container">
			<h1>Reslife DeskApp</h1>
			<h2>Log in</h2>

			<div id="login-box">

				<% if (request.getAttribute("error") != null) { %>
					<div class="message error">
						<%= request.getAttribute("error") %>
					</div>
				<% } %>

				<form method="POST" action="/login/" class="form" autocomplete="off">
					<div class="form-item">
						<label>Email or ID</label>
						<input type="text" name="user" autofocus="autofocus" />
					</div>

					<div class="form-item">
						<label>Password</label>
						<input type="password" name="password" />
					</div>

					<div class="form-item">
						<button>Log in</button>
					</div>
				</form>
			</div>
		</div>
	</body>
</html>