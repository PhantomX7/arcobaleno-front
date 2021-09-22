<div class=" inset-0 w-full h-full z-20 bg-opacity-50 duration-300 ">
	<div class="relative sm:w-3/4 md:w-1/2 lg:w-1/3 mx-2 sm:mx-auto my-10 opacity-100 overflow-y-auto">
		<div
			class=""
			x-show="showModal1"
			x-transition:enter="transition transform duration-300"
			x-transition:enter-start="scale-0"
			x-transition:enter-end="scale-100"
			x-transition:leave="transition transform duration-300"
			x-transition:leave-start="scale-100"
			x-transition:leave-end="scale-0"
		>
			<header class="flex items-center justify-between p-2">
				<h2 class="font-semibold">Header</h2>
				<button class="focus:outline-none p-2">
					<svg
						class="fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 18 18"
					>
						<path
							d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
						/>
					</svg>
				</button>
			</header>
			<main class="p-2 text-center">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatem, optio dolorem
					accusantium fuga molestias nobis sequi autem ducimus laudantium beatae amet earum, quia
					reiciendis corporis animi modi pariatur impedit!
				</p>
			</main>
			<footer class="flex justify-center p-2">
				<button
					class="bg-red-600 font-semibold text-white p-2 w-32 rounded-full hover:bg-red-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300"
				>
					Go back
				</button>
			</footer>
		</div>
	</div>
</div>
