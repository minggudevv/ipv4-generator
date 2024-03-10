document.getElementById('ipForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const ipCount = document.getElementById('ipCount').value;
    showLoading();
    setTimeout(function() {
        const ipAddresses = generateIPAddresses(ipCount);
        document.getElementById('ipAddresses').value = ipAddresses.join('\n');
        document.getElementById('output').style.display = 'block';
        hideLoading();
    }, 1500);
});

document.getElementById('copyButton').addEventListener('click', function() {
    const ipAddresses = document.getElementById('ipAddresses');
    ipAddresses.select();
    document.execCommand('copy');
    alert('IP Addresses copied to clipboard!');
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const ipAddresses = document.getElementById('ipAddresses').value;
    download('ip_addresses.txt', ipAddresses);
});

function showLoading() {
    document.getElementById('generateButton').setAttribute('disabled', 'disabled');
    document.getElementById('loadingSpinner').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('generateButton').removeAttribute('disabled');
    document.getElementById('loadingSpinner').classList.add('hidden');
}

function generateIPAddresses(count) {
    const ips = [];
    for (let i = 0; i < count; i++) {
        const ip = Array.from({length: 4}, () => Math.floor(Math.random() * 256)).join('.');
        ips.push(ip);
    }
    return ips;
}

function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
