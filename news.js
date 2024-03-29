$(document).ready(() => {
    getNews();

    function getNews() {
        let endPoint = "https://newsapi.org/v1/articles";
        let apiKey = "1cd5dee22bae447389fe218b99a29029";
        let urls = [
            `${endPoint}?source=engadget&sortBy=latest&apiKey=${apiKey}`,
            `${endPoint}?source=fortune&sortBy=latest&apiKey=${apiKey}`
        ];

        let allResults = [];
        let count = urls.length - 1;

        const get = (real) => {
            $.getJSON(urls[count], function (data) {
                console.log("JSON data has been retrieved from " + data.source);
                let news = data.articles; 
                allResults.push(news);
                real();
            })
        };
        recurse();

        function recurse() {
            if (count >= 0) {
                get(recurse);
                count--;
            } else {
                printNews(allResults);
            }
        }
    }

    function printNews(result) {
        let res = [];
        result.map(list => {
            return list.map(item => {
                res.push(item);
            })
        })

        shuffleArray(res);

        let output = "";
        for (let i = 0; i < res.length; i++) {
            let link = res[i].url;
            let resultDiv = `
                <div class="col-sm-4 col-md-4">
                    <div class="thumbnail">
                        <img src="${res[i].urlToImage}" alt="${res[i].title}" class="img-responsive">
                        <div class="caption">
                            <h2>${res[i].title}</h2>
                            <h4>${res[i].description}</h4>
                            <p><a href="${link}" target="_blank" class="btn btn-primary" role="button">View Article</a></p>
                        </div>
                    </div>
                </div>`;
            output += resultDiv;
        }
        $('.printResults').html(output);
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
});
