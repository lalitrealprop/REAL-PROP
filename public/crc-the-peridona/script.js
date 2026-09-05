const counters=document.querySelectorAll("[data-count]");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter=entry.target;

const target=+counter.dataset.count;

let count=0;

const speed=target/60;

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.ceil(count);

requestAnimationFrame(update);

}else{

counter.innerText=target;

}

};

update();

observer.unobserve(counter);

}

});

});

counters.forEach(counter=>observer.observe(counter));
/*====================================================
        SCROLL REVEAL ANIMATION
====================================================*/

const revealElements = document.querySelectorAll(
    ".story-block, .amenities-showcase, .amenity-card, .featured-amenity, .partner-card, .highlight-card"
);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

revealElements.forEach(item=>{

    /* Keep all primary CRC content rendered even if an observer
       is delayed by React's dynamic script injection. */
    if (!item.classList.contains("story-block") && !item.classList.contains("amenities-showcase")) {
        item.classList.add("hidden");
    }

    revealObserver.observe(item);

});


/*====================================================
        STAGGER ANIMATION
====================================================*/

const amenityCards=document.querySelectorAll(".amenity-card");

const amenityObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

amenityCards.forEach((card,index)=>{

setTimeout(()=>{

card.classList.add("show");

},index*120);

});

}

});

},{
threshold:.2
});

if(document.querySelector(".amenities-grid")){

amenityObserver.observe(document.querySelector(".amenities-grid"));

}

/*====================================================
        SMOOTH BUTTON HOVER
====================================================*/

const buttons=document.querySelectorAll(".btn-primary");

buttons.forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const x=e.offsetX;

const y=e.offsetY;

btn.style.setProperty("--x",x+"px");

btn.style.setProperty("--y",y+"px");

});

});

/*==================================================
        FLOOR PLANS V2
==================================================*/

(() => {

    const plans = {

        plan1: {

            image: "/crc-the-peridona/images/floorplans/4bhk.webp",

            title: "4 BHK Golf Residence",

            desc: "A masterpiece crafted for families seeking expansive living spaces, golf-facing balconies and complete privacy.",

            area: "4950 Sq.ft",

            bed: "4"

        },

        plan2: {

            image: "/crc-the-peridona/images/floorplans/4-5bhk.webp",

            title: "4.5 BHK Golf Residence",

            desc: "Designed for larger families with expansive entertainment spaces and spectacular golf course views.",

            area: "6200 Sq.ft",

            bed: "4.5"

        },

        plan3: {

            image: "/crc-the-peridona/images/floorplans/5-5bhk.webp",

            title: "5.5 BHK Sky Residence",

            desc: "The signature residence offering unmatched luxury, privacy and panoramic skyline views.",

            area: "8900 Sq.ft",

            bed: "5.5"

        }

    };


    const buttons = document.querySelectorAll(".plan-btn");

    const image = document.getElementById("planImage");

    const title = document.getElementById("planTitle");

    const desc = document.getElementById("planDesc");

    const area = document.getElementById("planArea");

    const bed = document.getElementById("planBed");


    buttons.forEach(button => {

        button.addEventListener("click", function () {

            buttons.forEach(btn => btn.classList.remove("active"));

            this.classList.add("active");

            const plan = plans[this.dataset.plan];

            if (!plan) return;

            image.style.opacity = "0";

            setTimeout(() => {

                image.src = plan.image;

                title.textContent = plan.title;

                desc.textContent = plan.desc;

                area.textContent = plan.area;

                bed.textContent = plan.bed;

                image.style.opacity = "1";

            }, 250);

        });

    });

})();
document.querySelectorAll(".plan-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        console.log("Clicked:", this.dataset.plan);
    });
});
/*==================================================
            PRELOADER
==================================================*/

const hidePreloader = () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;
    setTimeout(() => preloader.classList.add("hide"), 1200);
};

if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", hidePreloader, { once: true });
} else {
    hidePreloader();
}
/*==================================================
      REAL PROP FIREBASE LEAD FORM
==================================================*/

const leadForm = document.getElementById("leadForm");

if (leadForm) {

    leadForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitBtn =
            this.querySelector("button[type='submit']") ||
            this.querySelector("button");

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Submitting...";
        }

        const lead = {
            project: "CRC The Peridona",
            name: document.getElementById("name")?.value.trim() || "",
            phone: document.getElementById("phone")?.value.trim() || "",
            email: document.getElementById("email")?.value.trim() || "",
            propertyType: document.getElementById("configuration")?.value || "General",
            visitDate: document.getElementById("visitDate")?.value || "",
            message: document.getElementById("message")?.value.trim() || "",
        };

        try {

            if (typeof window.__realPropSubmitCRCLead !== "function") {
                throw new Error("REAL PROP lead handler is unavailable.");
            }

            await window.__realPropSubmitCRCLead(lead);

            if (typeof window.__realPropTrackCRCEvent === "function") {
                window.__realPropTrackCRCEvent("lead_submitted", {
                    project_name: "CRC The Peridona",
                    project_slug: "crc-the-peridona"
                });
            }

            leadForm.reset();

            const successPopup =
                document.getElementById("successPopup");

            if (successPopup) {
                successPopup.classList.add("show");
            }

        } catch (error) {

            console.error("CRC lead submission error:", error);

            const errorBox = document.getElementById("leadFormError");
            if (errorBox) {
                errorBox.textContent =
                    "We could not submit your enquiry right now. Please call or WhatsApp REAL PROP.";
                errorBox.style.display = "block";
            }

        } finally {

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Schedule My Visit";
            }

        }

    });

}


/*==================================================
      SUCCESS POPUP BUTTON
==================================================*/


const continueBtn =
    document.getElementById("continueBrowsing");

if (continueBtn) {

    continueBtn.addEventListener("click", function () {

        const successPopup =
            document.getElementById("successPopup");

        if (successPopup) {

            successPopup.classList.remove("show");

        }

    });

}

/*====================================================
      BELOW-FOLD VIDEO LAZY LOAD
      Keeps the visual presentation unchanged while
      preventing the MP4 from competing with LCP.
====================================================*/

(() => {

    const lazyVideos = document.querySelectorAll("video[data-lazy-video]");

    if (!lazyVideos.length) return;

    const loadVideo = (video) => {

        const source = video.querySelector("source[data-src]");

        if (!source || source.src) return;

        source.src = source.dataset.src;
        video.load();

        const playPromise = video.play();

        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {});
        }

    };

    if (!("IntersectionObserver" in window)) {
        lazyVideos.forEach(loadVideo);
        return;
    }

    const videoObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                loadVideo(entry.target);
                observer.unobserve(entry.target);
            }

        });

    }, { rootMargin: "300px 0px" });

    lazyVideos.forEach(video => videoObserver.observe(video));

})();
