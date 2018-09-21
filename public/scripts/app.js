/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [{
        "user": {
            "name": "Newton",
            "avatars": {
                "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
                "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
                "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
            },
            "handle": "@SirIsaac"
        },
        "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
    },
    {
        "user": {
            "name": "Descartes",
            "avatars": {
                "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
                "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
                "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            "handle": "@rd"
        },
        "content": {
            "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
    },
    {
        "user": {
            "name": "Johann von Goethe",
            "avatars": {
                "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
                "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
                "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            "handle": "@johann49"
        },
        "content": {
            "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
        },
        "created_at": 1461113796368
    }
];



function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function createTweetElement(tweet) {
    const $tweet = $("<article>").addClass("tweet-article");
    const head = `<header class = "header2">
            <img class="handle-logo" src="${tweet.user.avatars.small}" alt="logo">
            <h1 class ="name-header">${tweet.user.name}</h1>
            <p class="handle">${tweet.user.handle}</p>
          </header>`
    const body = `<p class="tweet-text"> ${escape(tweet.content.text)} </p>`
    const timeCreated = new Date(tweet.created_at).toLocaleTimeString();
    const foot = `<footer class="time-stamp"> ${timeCreated}</footer>`

    $tweet.append(head);
    $tweet.append(body);
    $tweet.append(foot);

    return $tweet
}


function renderTweets(tweets) {
    const $container = $('#tweets-container')
    const wrapper = $("<div></div>")
    tweets.forEach(tweet => {
        wrapper.prepend(createTweetElement(tweet));
    })
    $container.html(wrapper)
}

function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
        .then(function(tweets) {
            renderTweets(tweets);
        });
}


$(document).ready(function() {
    loadTweets();
    //toggle()
    $("#compose").click(function() {
        $(".new-tweet").animate({
            height: "toggle",
            opacity: "toggle"
        });
        $(".form").focus();
    });

    var $form = $('#tweet-form');

    $form.submit(function(event) {
        event.preventDefault();
        $("#errorMessage").hide();
        var $textarea = $form.find("textarea")

        if (!$textarea.val().length) {
            $("#errorMessage").text("Please enter a tweet")
            $("#errorMessage").show({
                opacity: "toggle"
            });
        } else if ($textarea.val().length > 140) {
            $("#errorMessage").text("Please keep character count under 140")
            $("#errorMessage").show({
                opacity: "toggle"
            });
        } else {

            $.ajax('/tweets', {
                data: $(this).serialize(),
                method: 'POST',
                success: function(data) {
                  $(".counter").html("140");
                    loadTweets();
                }
            })

            const newTweet = {};
            $.ajax("/tweets", { method: "GET" })
                .then(function(grabbedTweets) {
                    newTweet = newTweet[newTweet.length - 1];
                    $("tweets-container").prepend(createTweetElement(newTweet))
                })
        }
    })
})
