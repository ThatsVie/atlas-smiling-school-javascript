$(document).ready(function() {
    console.log("Document is ready");
    const currentPath = window.location.pathname;
    console.log("Current path:", currentPath);

    const basePath = '/atlas-smiling-school-javascript/';
    console.log("Base path:", basePath);

    if (currentPath === `${basePath}index.html` || currentPath === `${basePath}`) {
        console.log("Populating quotes for homepage");
        populateQuotes();
        populateTutorials();
        populateLatest();
    } else if (currentPath === `${basePath}pricing.html`) {
        console.log("Populating quotes for pricing page");
        populateQuotes();
    } else if (currentPath === `${basePath}courses.html`) {
        console.log("Populating course categories and courses for courses page");
        populateCourseCategories();
        populateCourses();
    }

    const keywordsInput = document.getElementById('select-keywords');
    if (keywordsInput) {
        console.log("Adding event listener to keywords input");
        keywordsInput.addEventListener('input', populateCourses);
    } else {
        console.log("Keywords input not found");
    }
});


function populateQuotes() {
    console.log("Fetching quotes...");
    $.ajax({
        url: "https://smileschool-api.hbtn.info/quotes",
        method: "GET",
        success: function(response) {
            console.log("Quotes received:", response);
            const quoteCarousel = $('#quote-carousel');
            
            response.forEach((quote, index) => {
                console.log("Processing quote:", quote);
                const carouselItem = $('<div>').addClass('carousel-item');
                const row = $('<div>').addClass('row mx-auto align-items-center');
                const imgCol = $('<div>').addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 text-center');
                const quoteImage = $('<img>').addClass('d-block align-self-center').attr('src', quote.pic_url);
                const textCol = $('<div>').addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0');
                const quoteTextContainer = $('<div>').addClass('quote-text');
                const quoteText = $('<p>').addClass('text-white').text(quote.text);
                const quoteAuthor = $('<h4>').addClass('text-white font-weight-bold').text(quote.name);
                const quoteTitle = $('<span>').addClass('text-white').text(quote.title);

                quoteTextContainer.append(quoteText, quoteAuthor, quoteTitle);
                textCol.append(quoteTextContainer);
                imgCol.append(quoteImage);
                row.append(imgCol, textCol);
                carouselItem.append(row);
                quoteCarousel.append(carouselItem);

                if (index === 0) {
                    carouselItem.addClass('active');
                }
            });
            $('#loading-quotes').addClass('d-none');
            $('#quotes-container').removeClass('d-none');
        },
        error: function() {
            console.error("Error loading quotes");
            alert("Error loading quotes");
        }
    });
}

function populateTutorials() {
    $.ajax({
        url: "https://smileschool-api.hbtn.info/popular-tutorials",
        method: "GET",
        success: function(response) {
            const tutorialCarousel = $('#tutorial-carousel');

            response.forEach(function(tutorial) {
                const card = $('<div>').addClass('card p-3');
                const thumbnail = $('<img>').addClass('card-img-top').attr('src', tutorial.thumb_url);
                const cardOverlay = $('<div>').addClass('card-img-overlay text-center');
                const playButton = $('<img>').addClass('mx-auto my-auto play-overlay').attr('src', 'images/play.png').attr('width', '64px');
                const cardBody = $('<div>').addClass('card-body');
                const cardTitle = $('<h5>').addClass('card-title font-weight-bold').text(tutorial.title);
                const cardSubtitle = $('<p>').addClass('card-text text-muted').text(tutorial["sub-title"]);
                const creatorContainer = $('<div>').addClass('creator d-flex align-items-center');
                const creatorImage = $('<img>').addClass('rounded-circle').attr('src', tutorial.author_pic_url).attr('width', '30px');
                const creatorName = $('<h6>').addClass('pl-3 m-0 main-color').text(tutorial.author);
                const cardFooter = $('<div>').addClass('info pt-3 d-flex justify-content-between');
                const ratingContainer = $('<div>').addClass('rating d-flex');
                
                for (let i = 1; i <= 5; i++) {
                    const star = $('<img>').attr('width', '15px').attr('height', '15px');
                    if (i <= tutorial.star) {
                        star.attr('src', 'images/star_on.png');
                    } else {
                        star.attr('src', 'images/star_off.png');
                    }
                    ratingContainer.append(star);
                }

                const duration = $('<span>').addClass('main-color').text(tutorial.duration);

                cardFooter.append(ratingContainer, duration);
                creatorContainer.append(creatorImage, creatorName);
                cardBody.append(cardTitle, cardSubtitle, creatorContainer, cardFooter);
                cardOverlay.append(playButton);
                card.append(thumbnail, cardOverlay, cardBody);
                tutorialCarousel.append(card);
            });

            $('#tutorial-carousel').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                prevArrow: $('.prev1'),
                nextArrow: $('.next1'),
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });

            $('#loading-tutorials').addClass('d-none');
            $('#tutorial-carousel').removeClass('d-none');
        },
        error: function() {
            alert("Error loading tutorials");
        }
    });
}

function populateLatest() {
    $.ajax({
        url: "https://smileschool-api.hbtn.info/latest-videos",
        method: "GET",
        success: function(response) {
            const latestCarousel = $('#latest-carousel');

            response.forEach(function(tutorial) {
                const card = $('<div>').addClass('card p-3');
                const thumbnail = $('<img>').addClass('card-img-top').attr('src', tutorial.thumb_url);
                const cardOverlay = $('<div>').addClass('card-img-overlay text-center');
                const playButton = $('<img>').addClass('mx-auto my-auto play-overlay').attr('src', 'images/play.png').attr('width', '64px');
                const cardBody = $('<div>').addClass('card-body');
                const cardTitle = $('<h5>').addClass('card-title font-weight-bold').text(tutorial.title);
                const cardSubtitle = $('<p>').addClass('card-text text-muted').text(tutorial["sub-title"]);
                const creatorContainer = $('<div>').addClass('creator d-flex align-items-center');
                const creatorImage = $('<img>').addClass('rounded-circle').attr('src', tutorial.author_pic_url).attr('width', '30px');
                const creatorName = $('<h6>').addClass('pl-3 m-0 main-color').text(tutorial.author);
                const cardFooter = $('<div>').addClass('info pt-3 d-flex justify-content-between');
                const ratingContainer = $('<div>').addClass('rating d-flex');
                
                for (let i = 1; i <= 5; i++) {
                    const star = $('<img>').attr('width', '15px').attr('height', '15px');
                    if (i <= tutorial.star) {
                        star.attr('src', 'images/star_on.png');
                    } else {
                        star.attr('src', 'images/star_off.png');
                    }
                    ratingContainer.append(star);
                }

                const duration = $('<span>').addClass('main-color').text(tutorial.duration);

                cardFooter.append(ratingContainer, duration);
                creatorContainer.append(creatorImage, creatorName);
                cardBody.append(cardTitle, cardSubtitle, creatorContainer, cardFooter);
                cardOverlay.append(playButton);
                card.append(thumbnail, cardOverlay, cardBody);
                latestCarousel.append(card);
            });

            $('#latest-carousel').slick({
                slidesToShow: 3.99,
                slidesToScroll: 1,
                prevArrow: $('.prev2'),
                nextArrow: $('.next2'),
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });

            $('#loading-latest').addClass('d-none');
            $('#latest-carousel').removeClass('d-none');
        },
        error: function() {
            alert("Error loading latest videos");
        }
    });
}

function populateCourseCategories() {
    $.ajax({
        url: "https://smileschool-api.hbtn.info/courses",
        method: "GET",
        success: function(response) {
            const topicDropdown = $('#topic-dropdown');
            const sortDropdown = $('#sort-dropdown');

            response.topics.forEach(function(topic) {
                const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
                const topicOption = `<a class="dropdown-item" href="#" onclick="changeTopic('${capitalizedTopic}')">${capitalizedTopic}</a>`;
                topicDropdown.append(topicOption);
            });

            response.sorts.forEach(function(sort) {
                const capitalizedSort = sort.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                const sortOption = `<a class="dropdown-item" href="#" onclick="changeSort('${capitalizedSort}')">${capitalizedSort}</a>`;
                sortDropdown.append(sortOption);
            });
        },
        error: function() {
            alert("Error loading course categories.");
        }
    });
}

function populateCourses() {
    $('#loading-courses').removeClass('d-none');
    $('#course-container').addClass('d-none');

    const keywordInput = document.getElementById('select-keywords').value.toLowerCase();
    const topicSelect = document.getElementById('select-topic').textContent.toLowerCase();
    const sortBySelect = document.getElementById('select-sort-by').textContent;

    $.ajax({
        url: "https://smileschool-api.hbtn.info/courses",
        method: "GET",
        success: function(response) {
            console.log("Courses data received:", response);

            const courseZone = $('#course-zone');
            courseZone.empty();

            let courseCount = 0;
            let courseArray = [];

            response.courses.forEach(function(course) {
                const courseTopic = course.topic.toLowerCase();
                const courseKeywords = course.keywords.map(keyword => keyword.toLowerCase());

                if (topicSelect === "all" || courseTopic === topicSelect) {
                    if (keywordInput === '' || courseKeywords.includes(keywordInput)) {
                        courseCount += 1;
                        const courseCol = $('<div>').addClass('col-12 col-sm-4 col-lg-3 d-flex justify-content-center');
                        const card = $('<div>').addClass('card p-3');
                        const thumbnail = $('<img>').addClass('card-img-top').attr('src', course.thumb_url);
                        const cardOverlay = $('<div>').addClass('card-img-overlay text-center');
                        const playButton = $('<img>').addClass('mx-auto my-auto play-overlay').attr('src', 'images/play.png').attr('width', '64px');
                        const cardBody = $('<div>').addClass('card-body');
                        const cardTitle = $('<h5>').addClass('card-title font-weight-bold').text(course.title);
                        const cardSubtitle = $('<p>').addClass('card-text text-muted').text(course['sub-title']);
                        const creatorContainer = $('<div>').addClass('creator d-flex align-items-center');
                        const creatorImage = $('<img>').addClass('rounded-circle').attr('src', course.author_pic_url).attr('width', '30px');
                        const creatorName = $('<h6>').addClass('pl-3 m-0 main-color').text(course.author);
                        const cardFooter = $('<div>').addClass('info pt-3 d-flex justify-content-between');
                        const ratingContainer = $('<div>').addClass('rating d-flex');

                        for (let i = 1; i < 6; i++) {
                            const star = $('<img>').attr('width', '15px').attr('height', '15px');
                            if (i <= course.star) {
                                star.attr('src', 'images/star_on.png');
                            } else {
                                star.attr('src', 'images/star_off.png');
                            }
                            ratingContainer.append(star);
                        }

                        const duration = $('<span>').addClass('main-color').text(course.duration);

                        cardFooter.append(ratingContainer, duration);
                        creatorContainer.append(creatorImage, creatorName);
                        cardBody.append(cardTitle, cardSubtitle, creatorContainer, cardFooter);
                        cardOverlay.append(playButton);
                        card.append(thumbnail, cardOverlay, cardBody);
                        courseCol.append(card);

                        const sortValue = sortBySelect;
                        if (sortValue === 'Most Popular') {
                            courseArray.push([courseCol, course.star]);
                        } else if (sortValue === 'Most Recent') {
                            courseArray.push([courseCol, course.published_at]);
                        } else if (sortValue === 'Most Viewed') {
                            courseArray.push([courseCol, course.views]);
                        }
                    }
                }
            });

            if (sortBySelect === 'Most Popular') {
                courseArray.sort((a, b) => b[1] - a[1]);
            } else if (sortBySelect === 'Most Recent') {
                courseArray.sort((a, b) => b[1] - a[1]);
            } else if (sortBySelect === 'Most Viewed') {
                courseArray.sort((a, b) => b[1] - a[1]);
            }

            courseArray.forEach(function(courses) {
                courseZone.append(courses[0]);
            });

            $('.video-count').text(`${courseCount} videos`);

            $('#loading-courses').addClass('d-none');
            $('#course-container').removeClass('d-none');
        },
        error: function() {
            console.error("Error loading courses");
            alert("Error loading courses");
        }
    });
}

function changeTopic(option) {
    document.getElementById('select-topic').innerText = option;
    populateCourses();  
}

function changeSort(option) {
    document.getElementById('select-sort-by').innerText = option;
    populateCourses();
}