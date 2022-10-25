// when the dom content is loaded only
document.addEventListener('DOMContentLoaded', () => {

    // weather form on submit only
    document.querySelector('#weather_form', onsubmit = () => {

        // allow ajax request
        const request = new XMLHttpRequest();
        const city = document.querySelector('#city').value;
        request.open('POST', '/get_weather');

        // when request is done
        request.onload = () => {

            // extract JSON data from request
            const data = JSON.parse(request.responseText);

            if (data.success) {
                document.querySelector('#weather_result').innerHTML = `${data.val.temp} ${data.val.desc} ${data.val.code} ${city}`;
            }
            else {
                document.querySelector('#weather_result').innerHTML = `${request.success}not found`;
            }
        }

        // data to send 
        const data = new FormData();
        data.append('city', city);

        // send request
        request.send(data);
        return false;
    })
})