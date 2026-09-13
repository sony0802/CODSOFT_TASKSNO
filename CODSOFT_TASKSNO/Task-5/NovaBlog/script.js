/* =========================================================
   NOVABLOG - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("show");

        const isOpen = navMenu.classList.contains("show");

        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });


    /* Close menu after clicking a link */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");

            menuBtn.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });

}


/* =========================================================
   ARTICLE DATA
========================================================= */

const articles = {

    /* =========================
       AI
    ========================== */

    ai: {

        category: "Technology",

        title:
            "How Artificial Intelligence Is Changing Everyday Life",

        date:
            "September 10, 2026",

        readTime:
            "5 min read",

        image:
            "images/ai.jpg",

        alt:
            "Artificial Intelligence",

        content: `

            <p>
                Artificial Intelligence is becoming an important
                part of everyday life. From smartphones and
                search engines to smart applications, AI is helping
                people complete tasks faster and more efficiently.
            </p>

            <h2>
                AI in Everyday Life
            </h2>

            <p>
                Many of the digital services we use every day
                already depend on artificial intelligence. Voice
                assistants, recommendation systems, navigation
                applications and online platforms use AI to
                understand information and provide useful results.
            </p>

            <p>
                AI can also help students and professionals by
                organizing information, automating repetitive
                tasks and supporting creative work.
            </p>

            <h2>
                The Future of AI
            </h2>

            <p>
                As technology continues to improve, artificial
                intelligence is expected to become even more
                useful across education, business, healthcare,
                communication and many other areas.
            </p>

        `
    },


    /* =========================
       CODING
    ========================== */

    coding: {

        category: "Technology",

        title:
            "Why Learning to Code Is a Valuable Skill",

        date:
            "September 9, 2026",

        readTime:
            "4 min read",

        image:
            "images/coding.jpg",

        alt:
            "Coding",

        content: `

            <p>
                Coding is one of the most useful skills in the
                modern digital world. It helps people understand
                how software works and provides the ability to
                create useful digital solutions.
            </p>

            <h2>
                Coding Builds Problem-Solving Skills
            </h2>

            <p>
                Learning to code teaches you how to break a
                complicated problem into smaller and manageable
                steps. This way of thinking can be useful even
                outside programming.
            </p>

            <p>
                Beginners can start with simple programming
                languages and gradually move toward web
                development, data analysis, application development
                and other technology fields.
            </p>

            <h2>
                Start With Small Projects
            </h2>

            <p>
                Building small projects is one of the best ways
                to improve coding skills. Simple websites,
                calculators and small applications can help
                learners understand programming concepts through
                practical experience.
            </p>

        `
    },


    /* =========================
       TRAVEL
    ========================== */

    travel: {

        category: "Travel",

        title:
            "Travel Ideas for Your Next Adventure",

        date:
            "September 8, 2026",

        readTime:
            "4 min read",

        image:
            "images/travel.jpg",

        alt:
            "Travel",

        content: `

            <p>
                Traveling gives us an opportunity to discover
                new places, experience different cultures and
                create memories that stay with us for years.
            </p>

            <h2>
                Choose the Right Destination
            </h2>

            <p>
                The best destination depends on your interests,
                budget and available time. Some travelers prefer
                peaceful natural locations, while others enjoy
                busy cities and cultural experiences.
            </p>

            <p>
                Before traveling, research the destination,
                transportation options and important local
                information so that you can enjoy the journey
                with greater confidence.
            </p>

            <h2>
                Make the Journey Memorable
            </h2>

            <p>
                Try local food, explore interesting places and
                spend time experiencing the local culture instead
                of simply visiting popular tourist attractions.
            </p>

        `
    },


    /* =========================
       BREAKFAST
    ========================== */

    breakfast: {

        category: "Food",

        title:
            "Easy Breakfast Ideas for Busy Mornings",

        date:
            "September 7, 2026",

        readTime:
            "3 min read",

        image:
            "images/breakfast.jpg",

        alt:
            "Healthy breakfast",

        content: `

            <p>
                Breakfast is a simple way to begin the day with
                energy. Even on busy mornings, a few easy meal
                ideas can help you avoid skipping your first meal.
            </p>

            <h2>
                Keep Breakfast Simple
            </h2>

            <p>
                Quick options such as fruit, oats, eggs, yogurt
                and simple sandwiches can be prepared without
                spending too much time in the kitchen.
            </p>

            <p>
                Preparing a few ingredients in advance can make
                busy mornings easier and help you maintain a
                consistent routine.
            </p>

            <h2>
                Plan Ahead
            </h2>

            <p>
                Preparing breakfast ingredients the night before
                can save valuable time in the morning and make
                healthy choices more convenient.
            </p>

        `
    },


    /* =========================
       MORNING
    ========================== */

    morning: {

        category: "Lifestyle",

        title:
            "Simple Morning Habits for a Better Day",

        date:
            "September 6, 2026",

        readTime:
            "4 min read",

        image:
            "images/Morning.jpg",

        alt:
            "Morning routine",

        content: `

            <p>
                A good morning routine can create a positive
                beginning for the rest of the day. Small habits
                can help improve focus, energy and productivity.
            </p>

            <h2>
                Start Without Rushing
            </h2>

            <p>
                Giving yourself enough time in the morning can
                reduce unnecessary stress. Simple activities such
                as drinking water, getting ready calmly and
                planning the day can make a difference.
            </p>

            <p>
                Avoiding distractions during the first part of
                the day can also help you focus on important tasks.
            </p>

            <h2>
                Build Consistency
            </h2>

            <p>
                A routine does not need to be complicated. Choose
                a few useful habits and follow them consistently
                until they become natural parts of your day.
            </p>

        `
    },


    /* =========================
       TECHNOLOGY TRENDS
    ========================== */

    trends: {

        category: "Technology",

        title:
            "Technology Trends That Are Changing Our Future",

        date:
            "September 5, 2026",

        readTime:
            "4 min read",

        image:
            "images/technology-trends.jpg",

        alt:
            "Technology trends",

        content: `

            <p>
                Technology continues to develop rapidly and
                influences almost every part of modern life.
                New digital tools are changing how people work,
                learn and communicate.
            </p>

            <h2>
                Emerging Technologies
            </h2>

            <p>
                Artificial intelligence, cloud computing,
                automation and other emerging technologies are
                creating new opportunities for individuals and
                businesses.
            </p>

            <p>
                Understanding these developments can help people
                prepare for future careers and make better use of
                modern digital tools.
            </p>

            <h2>
                Preparing for the Future
            </h2>

            <p>
                Continuous learning is one of the best ways to
                stay prepared. Developing digital skills and
                staying curious can make it easier to adapt to
                technological changes.
            </p>

        `
    },


    /* =========================
       BUDGET TRAVEL
    ========================== */

    "budget-travel": {

        category: "Travel",

        title:
            "Smart Tips for Budget Travel",

        date:
            "September 4, 2026",

        readTime:
            "4 min read",

        image:
            "images/budget-travel.jpg",

        alt:
            "Budget travel",

        content: `

            <p>
                Traveling does not always have to be expensive.
                With careful planning, it is possible to enjoy
                memorable trips while keeping expenses under
                control.
            </p>

            <h2>
                Plan Your Expenses
            </h2>

            <p>
                Create a simple travel budget that includes
                transportation, accommodation, food and activities.
                Knowing your expected expenses can help you avoid
                unnecessary spending.
            </p>

            <p>
                Comparing different travel options before booking
                can also help you find choices that fit your budget.
            </p>

            <h2>
                Spend on Experiences
            </h2>

            <p>
                Instead of spending heavily on unnecessary items,
                focus your budget on experiences that make your
                journey meaningful and enjoyable.
            </p>

        `
    },


    /* =========================
       PASTA
    ========================== */

    pasta: {

        category: "Food",

        title:
            "A Simple Guide to Homemade Pasta",

        date:
            "September 3, 2026",

        readTime:
            "5 min read",

        image:
            "images/pasta.jpg",

        alt:
            "Homemade pasta",

        content: `

            <p>
                Homemade pasta can be much easier to prepare than
                many people expect. With a few basic ingredients
                and simple techniques, you can create a delicious
                meal at home.
            </p>

            <h2>
                Start With Simple Ingredients
            </h2>

            <p>
                Basic pasta dough can be made using ingredients
                such as flour, eggs and a little salt. The dough
                needs to be mixed and kneaded until it becomes
                smooth.
            </p>

            <p>
                After resting the dough, it can be rolled out and
                cut into your preferred pasta shape.
            </p>

            <h2>
                Enjoy the Process
            </h2>

            <p>
                Homemade cooking is not only about the final dish.
                The process itself can be relaxing and rewarding,
                especially when shared with family or friends.
            </p>

        `
    },


    /* =========================
       PRODUCTIVITY
    ========================== */

    productivity: {

        category: "Lifestyle",

        title:
            "Create a More Productive Workspace",

        date:
            "September 2, 2026",

        readTime:
            "4 min read",

        image:
            "images/Work Desk.jpg",

        alt:
            "Productive workspace",

        content: `

            <p>
                Your workspace can have a major effect on your
                ability to focus. A clean and organized environment
                can make it easier to concentrate on important work.
            </p>

            <h2>
                Keep Your Desk Organized
            </h2>

            <p>
                Remove unnecessary items from your workspace and
                keep the things you use most within easy reach.
                A simple setup can reduce distractions.
            </p>

            <p>
                Good lighting and a comfortable working position
                can also make long study or work sessions easier.
            </p>

            <h2>
                Create a Focused Environment
            </h2>

            <p>
                Try to keep your workspace separate from
                unnecessary distractions. Having a dedicated place
                for study or work can help create a stronger focus
                routine.
            </p>

        `
    },


    /* =========================
       ADVENTURE
    ========================== */

    adventure: {

        category: "Travel",

        title:
            "Why Adventure Travel Creates Lasting Memories",

        date:
            "September 1, 2026",

        readTime:
            "5 min read",

        image:
            "images/adventure.jpg",

        alt:
            "Adventure travel",

        content: `

            <p>
                Adventure travel encourages us to step outside
                familiar routines and experience something new.
                These experiences often become some of our most
                memorable travel moments.
            </p>

            <h2>
                Step Outside Your Comfort Zone
            </h2>

            <p>
                Trying a new activity, visiting an unfamiliar
                place or exploring nature can create a sense of
                excitement and discovery.
            </p>

            <p>
                Adventure does not always mean extreme activities.
                Even a new hiking route or an unfamiliar destination
                can provide a refreshing experience.
            </p>

            <h2>
                Enjoy the Experience
            </h2>

            <p>
                The most important part of adventure travel is
                enjoying the journey, learning from new experiences
                and creating memories along the way.
            </p>

        `
    },


    /* =========================
       HEALTHY MEAL
    ========================== */

    "healthy-meal": {

        category: "Food",

        title:
            "Simple Ideas for a Healthier Meal",

        date:
            "August 31, 2026",

        readTime:
            "4 min read",

        image:
            "images/healthy-meal.jpg",

        alt:
            "Healthy meal",

        content: `

            <p>
                Creating a balanced meal does not require
                complicated recipes. Simple ingredients can be
                combined to create meals that are satisfying and
                nutritious.
            </p>

            <h2>
                Build a Balanced Plate
            </h2>

            <p>
                Including a variety of vegetables, protein sources
                and carbohydrates can help create a balanced meal.
                Different colors and ingredients can also make
                meals more enjoyable.
            </p>

            <p>
                Drinking enough water and paying attention to
                portion sizes can also support healthy everyday
                eating habits.
            </p>

            <h2>
                Keep It Practical
            </h2>

            <p>
                Healthy eating becomes easier when meals are simple
                enough to prepare regularly. Focus on realistic
                habits that can fit naturally into your routine.
            </p>

        `
    },


    /* =========================
       HEALTHY LIFESTYLE
    ========================== */

    "healthy-lifestyle": {

        category: "Lifestyle",

        title:
            "Small Lifestyle Changes That Make a Difference",

        date:
            "August 30, 2026",

        readTime:
            "5 min read",

        image:
            "images/healthy-lifestyle.jpg",

        alt:
            "Healthy lifestyle",

        content: `

            <p>
                Improving your lifestyle does not require changing
                everything at once. Small and consistent improvements
                can gradually create a meaningful difference.
            </p>

            <h2>
                Focus on Small Habits
            </h2>

            <p>
                Simple habits such as staying active, getting enough
                rest, organizing your day and making balanced food
                choices can become valuable parts of everyday life.
            </p>

            <p>
                The key is consistency. A small habit followed
                regularly can be more useful than a large change
                that is difficult to maintain.
            </p>

            <h2>
                Make Progress Gradually
            </h2>

            <p>
                Give yourself time to develop new routines. Focus
                on progress rather than trying to make everything
                perfect from the beginning.
            </p>

        `
    }

};


/* =========================================================
   LOAD ARTICLE
========================================================= */

const articleTitle = document.getElementById("articleTitle");
const articleCategory = document.getElementById("articleCategory");
const articleDate = document.getElementById("articleDate");
const articleReadTime = document.getElementById("articleReadTime");
const articleImage = document.getElementById("articleImage");
const articleBody = document.getElementById("articleBody");
const articleHero = document.getElementById("articleHero");


if (articleTitle && articleBody) {

    const params = new URLSearchParams(window.location.search);

    const articleId = params.get("id");

    const article = articles[articleId];


    if (article) {

        /* Update browser title */

        document.title =
            `${article.title} | NovaBlog`;


        /* Update article information */

        articleTitle.textContent =
            article.title;

        if (articleCategory) {
            articleCategory.textContent =
                article.category;
        }

        if (articleDate) {
            articleDate.textContent =
                article.date;
        }

        if (articleReadTime) {
            articleReadTime.textContent =
                article.readTime;
        }


        /* Update image */

        if (articleImage) {

            articleImage.src =
                article.image;

            articleImage.alt =
                article.alt;

        }


        /* Update article content */

        articleBody.innerHTML =
            article.content;


        /* Update hero background */

        if (articleHero) {

            articleHero.style.backgroundImage =
                `url("${article.image}")`;

        }

    } else {

        /* =========================
           INVALID ARTICLE
        ========================== */

        document.title =
            "Article Not Found | NovaBlog";

        if (articleCategory) {
            articleCategory.textContent =
                "NovaBlog";
        }

        articleTitle.textContent =
            "Article Not Found";

        if (articleDate) {
            articleDate.textContent =
                "";
        }

        if (articleReadTime) {
            articleReadTime.textContent =
                "";
        }

        if (articleImage) {
            articleImage.src =
                "images/technology-trends.jpg";

            articleImage.alt =
                "NovaBlog";
        }

        articleBody.innerHTML = `

            <p>
                Sorry, the article you are looking for could
                not be found.
            </p>

            <p>
                Please return to NovaBlog and choose an article
                from the available stories.
            </p>

            <a href="index.html"
                class="btn btn-primary">
                Back to Home
            </a>

        `;

    }

}


/* =========================================================
   LOAD MORE ARTICLES
========================================================= */

const loadMoreBtn =
    document.getElementById("loadMoreBtn");

const hiddenCards =
    document.querySelectorAll(".hidden-card");


if (loadMoreBtn && hiddenCards.length > 0) {

    loadMoreBtn.addEventListener("click", () => {

        hiddenCards.forEach(card => {

            card.style.display = "block";

        });

        loadMoreBtn.style.display = "none";

    });

}


/* =========================================================
   SEARCH ARTICLES
========================================================= */

const searchInput =
    document.getElementById("searchInput");

const blogGrid =
    document.getElementById("blogGrid");

const noResults =
    document.getElementById("noResults");


if (searchInput && blogGrid) {

    const cards =
        blogGrid.querySelectorAll(".blog-card");


    searchInput.addEventListener("input", () => {

        const searchValue =
            searchInput.value
                .trim()
                .toLowerCase();

        let visibleCards = 0;


        cards.forEach(card => {

            const cardText =
                card.textContent.toLowerCase();

            if (cardText.includes(searchValue)) {

                card.style.display = "block";

                visibleCards++;

            } else {

                card.style.display = "none";

            }

        });


        /* Hide load more while searching */

        if (loadMoreBtn) {

            if (searchValue !== "") {

                loadMoreBtn.style.display =
                    "none";

            } else {

                const remainingHidden =
                    document.querySelectorAll(
                        ".hidden-card"
                    );

                let hiddenCount = 0;

                remainingHidden.forEach(card => {

                    if (
                        card.style.display !== "block"
                    ) {
                        hiddenCount++;
                    }

                });

                loadMoreBtn.style.display =
                    hiddenCount > 0
                        ? "inline-flex"
                        : "none";

            }

        }


        /* No result message */

        if (noResults) {

            noResults.style.display =
                visibleCards === 0
                    ? "block"
                    : "none";

        }

    });

}


/* =========================================================
   COPY ARTICLE LINK
========================================================= */

const copyLinkBtn =
    document.getElementById("copyLinkBtn");

const shareMessage =
    document.getElementById("shareMessage");


if (copyLinkBtn) {

    copyLinkBtn.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            if (shareMessage) {

                shareMessage.textContent =
                    "Article link copied successfully!";

            }

        } catch (error) {

            if (shareMessage) {

                shareMessage.textContent =
                    "Unable to copy the link. Please copy it from the address bar.";

            }

        }

    });

}


/* =========================================================
   SHARE ARTICLE
========================================================= */

const shareBtn =
    document.getElementById("shareBtn");


if (shareBtn) {

    shareBtn.addEventListener("click", async () => {

        const shareData = {

            title: document.title,

            text:
                "Check out this article on NovaBlog.",

            url:
                window.location.href

        };


        /* Native share */

        if (
            navigator.share &&
            window.isSecureContext
        ) {

            try {

                await navigator.share(shareData);

                if (shareMessage) {

                    shareMessage.textContent =
                        "Article shared successfully!";

                }

            } catch (error) {

                /*
                 User cancelled the share menu.
                 No error message is required.
                */

            }

            return;

        }


        /* Fallback */

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            if (shareMessage) {

                shareMessage.textContent =
                    "Link copied! You can share it anywhere.";

            }

        } catch (error) {

            if (shareMessage) {

                shareMessage.textContent =
                    "Please copy the article link from the address bar.";

            }

        }

    });

}


/* =========================================================
   COMMENTS
========================================================= */

const commentForm =
    document.getElementById("commentForm");

const commentsList =
    document.getElementById("commentsList");

const commentName =
    document.getElementById("commentName");

const commentText =
    document.getElementById("commentText");


if (
    commentForm &&
    commentsList &&
    commentName &&
    commentText
) {

    commentForm.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            commentName.value.trim();

        const text =
            commentText.value.trim();


        if (!name || !text) {
            return;
        }


        /* Remove no-comment message */

        const noComments =
            commentsList.querySelector(".no-comments");

        if (noComments) {
            noComments.remove();
        }


        /* Create comment */

        const comment =
            document.createElement("div");

        comment.className =
            "comment";


        const nameElement =
            document.createElement("strong");

        nameElement.textContent =
            name;


        const textElement =
            document.createElement("p");

        textElement.textContent =
            text;


        comment.appendChild(nameElement);

        comment.appendChild(textElement);

        commentsList.prepend(comment);


        /* Clear form */

        commentName.value = "";

        commentText.value = "";

    });

}