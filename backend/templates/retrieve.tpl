
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Published Article</title>
	<meta name="description" content="Free open source Tailwind CSS Minimalistic monochrome blog template">
	<meta name="keywords" content="tailwind,tailwindcss,tailwind css,css,starter template,free template,blog template, blog layout, minimal, monochrome, minimalistic, theme">
	
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,700,800" rel="stylesheet">
	<link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="../favicon-16x16.png">
	<link rel="manifest" href="../site.webmanifest">
	<link rel="mask-icon" href="../safari-pinned-tab.svg" color="#5bbad5">
	<meta name="msapplication-TileColor" content="#00aba9">
	<meta name="theme-color" content="#3b7977">

	<!-- Primary Meta Tags -->
	<meta name="title" content="Tailwind Toolbox - Free Starter Templates and Components for Tailwind CSS">
	<meta name="description" content="Free open source Tailwind CSS starter Templates and Components to get you started quickly to creating websites in Tailwind CSS!">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://www.tailwindtoolbox.com/">
	<meta property="og:title" content="Tailwind Toolbox - Free Starter Templates and Components for Tailwind CSS">
	<meta property="og:description" content="Free open source Tailwind CSS starter Templates and Components to get you started quickly to creating websites in Tailwind CSS!">
	<meta property="og:image" content="https://www.tailwindtoolbox.com/social.png">

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="https://www.tailwindtoolbox.com/">
	<meta property="twitter:title" content="Tailwind Toolbox - Free Starter Templates and Components for Tailwind CSS">
	<meta property="twitter:description" content="Free open source Tailwind CSS starter Templates and Components to get you started quickly to creating websites in Tailwind CSS!">
	<meta property="twitter:image" content="https://www.tailwindtoolbox.com/social.png">


	<link href="https://unpkg.com/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
	<!--Replace with your tailwind.css once created-->

<style>
p { margin-top: 12px; }
h1 { font-size: 1.6em; margin-top: 12px; }
h2 { font-size: 1.4em; margin-top: 12px; }
h3 { font-size: 1.2em; margin-top: 12px; }
li {
    margin-left: 20px;
    padding: 6px;
    list-style: disc;
}
a { color: #0000d3; }
</style>

</head>

<body class="bg-gray-100 font-sans leading-normal tracking-normal">

	<nav id="header" class="fixed w-full z-10 top-0">

		<div id="progress" class="h-1 z-20 top-0" style="background:linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0);"></div>

		<div class="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">

			<div class="block lg:hidden pr-4">
				<button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-green-500 appearance-none focus:outline-none">
					<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>

		</div>
	</nav>

	<!--Container-->
	<div class="container w-full md:max-w-3xl mx-auto pt-20">
	{{content}}
	</div>
	<!--/container-->

</body>

</html>
