let input = document.querySelector("input");
let submit = document.querySelector("span.get-button");
let boxes = document.querySelector(".show-data");
let spanAlert = document.querySelector(".show-data > span");

submit.onclick = function () {
	if (input.value === "")
		return (spanAlert.innerHTML = "please enter Github username");
	boxes.innerHTML = "";
	let repos = fetch(`https://api.github.com/users/${input.value}/repos`)
		.then((result) => {
			let data = result.json();
			return data;
		})
		.then((result) => {
			for (let i = 0; i < result.length; i++) {
				let repo = document.createElement("div");
				repo.className = "repo-box";
				let repoName = document.createTextNode(result[i].name);
				let visitBtn = document.createElement("a");
				visitBtn.innerHTML = "visit";
				visitBtn.href = `https://github.com/${result[i].full_name}`;
				let stars = document.createElement("span");
				stars.innerHTML = `Stars ${result[i].stargazers_count}`;
				repo.appendChild(repoName);
				repo.appendChild(visitBtn);
				repo.appendChild(stars);
				boxes.appendChild(repo);
			}
		});
};
