class SearchUtility {
  constructor() {
    this.bar = document.querySelector("#SeachBar");
  }

  bindSearchView(callback) {
    this.bar.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        let searchText = this.bar.value.toLowerCase().trim();
        callback(searchText);
      }
    });
  }
}

export { SearchUtility };
