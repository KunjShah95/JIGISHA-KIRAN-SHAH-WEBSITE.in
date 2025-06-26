document.addEventListener('DOMContentLoaded', function () {
    console.log('Checking Tailwind CSS functionality...');

    // Check if tailwind.config is available
    if (typeof tailwind !== 'undefined' && tailwind.config) {
        console.log('✅ Tailwind config is loaded.');
    } else {
        console.error('❌ Tailwind config is not loaded properly.');
    }

    // Create a test element to verify Tailwind classes are applied
    const testElement = document.createElement('div');
    testElement.classList.add('bg-blue-500', 'p-4', 'rounded', 'text-white', 'fixed', 'bottom-4', 'left-4', 'z-50', 'shadow-lg');
    testElement.style.maxWidth = '300px';
    testElement.innerHTML = `
        <p class="font-bold">Tailwind CSS Status</p>
        <p class="text-sm mt-2">If you can see this blue box with white text, Tailwind CSS is working correctly.</p>
        <button class="mt-2 bg-white text-blue-500 px-4 py-1 rounded text-sm hover:bg-blue-100 transition-colors" id="close-test">Close</button>
    `;

    document.body.appendChild(testElement);

    // Add event listener to close button
    document.getElementById('close-test').addEventListener('click', function () {
        testElement.remove();
    });

    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (document.body.contains(testElement)) {
            testElement.remove();
        }
    }, 8000);
});
