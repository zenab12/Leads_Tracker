let myleads = [];
let oldLeads = [];
const saveInput = document.getElementById("saveInput");
const input_el = document.getElementById("input-el");
const ul_el = document.getElementById("ul-el");
const deleteAll = document.getElementById("deleteAll");
const saveTab = document.getElementById("saveTab");
const tabs = [{ url: 'www.google.com' }];
const leadsFromStorage = JSON.parse(localStorage.getItem("myleads"));
console.log(leadsFromStorage);
console.log(myleads);
if (leadsFromStorage) {
    myleads = leadsFromStorage;
    renderLeads(myleads);
}

function renderLeads(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems +=
            `
            <li>
            <a href=\`${leads[i]}\` target='_blank'>${leads[i]}</a>
            </li>
            `
    }
    ul_el.innerHTML = listItems;
}


saveInput.addEventListener("click", function() {
    console.log(input_el.value);
    myleads.push(input_el.value);
    renderLeads(myleads);
    input_el.value = "";

    localStorage.setItem("myleads", JSON.stringify(myleads));
    console.log(myleads);
    console.log(localStorage.getItem("myleads"))

});

saveTab.addEventListener('click', function(e) {
    console.log(tabs[0].url);
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let activeTab = tabs[0];
        let activeTabId = activeTab.id;
        myleads.push(tabs[0].url);
        localStorage.setItem("myleads", JSON.stringify(myleads));
        renderLeads(myleads);
    });

})
deleteAll.addEventListener('click', function() {
    let confirmation = confirm("Are You sure that You want to delete All saved Links ?!");
    if (confirmation) {
        localStorage.clear();
        myleads = [];
        renderLeads(myleads);
    }
})


let links = document.querySelectorAll('a');
console.log(links);
for (let i = 0; i < links.length; i++) {
    links[i].href = links[i].href.slice(53, -3);
    console.log(links[i].href)
}
console.log(links);
console.log('updated')