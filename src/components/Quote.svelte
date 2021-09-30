<script>
    export let content;
</script>

<div class="min-w-full flex items-center justify-center px-5 pb-5">
    <div class="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800" style="max-width: 500px">
        <div class="w-full mb-10">
            <div class="text-3xl text-red-400 text-left leading-tight h-3">“</div>
            <p class="text-sm text-gray-600 text-center px-5">{content}</p>
            <div class="text-3xl text-red-400 text-right leading-tight h-3 -mt-3">”</div>
        </div>
        <div class="w-full">
            <p class="text-md text-red-400 font-bold text-center">~Ramalan</p>
        </div>
    </div>
</div>