import{i as c,S as m}from"./assets/vendor-0fc460d7.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const y="44527465-372387a79420ecddf2afa63d2",g="https://pixabay.com/api/";let i=1,u="";const L=document.getElementById("search-form"),d=document.querySelector(".gallery"),f=document.querySelector(".load-more"),l=()=>f.classList.add("hide"),b=()=>f.classList.remove("hide"),h=document.querySelector(".loader-wrapper"),w=()=>h.classList.remove("hide"),v=()=>h.classList.add("hide");L.addEventListener("submit",async r=>{r.preventDefault(),d.innerHTML="",i=1,u=r.target.searchQuery.value,await p()});f.addEventListener("click",async()=>{i+=1,await p()});async function p(){w(),l();try{const o=await(await fetch(`${g}?key=${y}&q=${u}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${i}`)).json();if(o.hits.length===0){l(),c.info({title:"Info",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again."});return}$(o.hits),b(),i===1&&c.success({title:"Success",position:"topRight",message:`Hooray! We found ${o.totalHits} images.`}),o.totalHits<=i*40&&(l(),c.info({title:"Error",position:"topRight",message:"We're sorry, but you've reached the end of search results."})),new m(".gallery a",{}).refresh()}catch(r){console.error("Error fetching images:",r)}finally{v()}}function $(r){const o=r.map(s=>`
    <a href="${s.largeImageURL}" class="photo-card">
      <img src="${s.webformatURL}" alt="${s.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <i class="fas fa-heart"></i> <b>Likes</b> ${s.likes}
        </p>
        <p class="info-item">
          <i class="fas fa-eye"></i> <b>Views</b> ${s.views}
        </p>
        <p class="info-item">
          <i class="fas fa-comment"></i> <b>Comments</b> ${s.comments}
        </p>
        <p class="info-item">
          <i class="fas fa-download"></i> <b>Downloads</b> ${s.downloads}
        </p>
      </div>
    </a>
  `).join("");d.insertAdjacentHTML("beforeend",o);const{height:a}=d.firstElementChild.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
