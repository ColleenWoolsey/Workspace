// app.js
// function removeMe(lastTarget) {
//     console.log("#" + lastTarget);
//       const parentDynamicContent = document.querySelector("#" + lastTarget);
//       console.log(parentDynamicContent);
//       var itIsGoneName = parentDynamicContent.querySelector('span#fact__name');
//       var itIsGoneFact = parentDynamicContent.querySelector('span#fact__fact');
//       console.log(itIsGoneName + "  " + itIsGoneFact);
//       parentDynamicContent.removeChild(itIsGoneName);
//       parentDynamicContent.removeChild(itIsGoneFact);
//   }

function dynamicContent(bs, zerobs, lastTarget) {
    console.log("bs: " + bs + "     xerobs: " + zerobs);
    console.log("#" + lastTarget);
    const toBeSortedArray = [];
    fetch('baby-steps.json')
        .then(response => response.json())
        .then(parsedresponse => {
            tempArray = parsedresponse.friends;
            for (var i = 0; i < tempArray.length; i++) {
                console.log(tempArray[i].babyStep);
                if (tempArray[i]['babyStep'] == bs) {
                    toBeSortedArray.push((tempArray)[i]);
                }
            }
            console.log(toBeSortedArray);

            const newArray = toBeSortedArray.sort(function(a, b) {
                var nameA = a.lastName.toUpperCase();
                var nameB = b.lastName.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            console.log(newArray);

            const friends = {};
            var countFolk = newArray.length;
            if (newArray.length > 0) {
                if (countFolk !== 0) {
                    friends['bStep'] = newArray[0]['babyStep'];

                    if (countFolk == 1) {

                        friends['one'] = [`${newArray[0]['firstName']} ${newArray[0]['lastName']}-`];
                        friends['encourage'] = `is also in Baby Step ${friends.bStep}.`;
                        console.log(friends['one'] + friends['encourage']);

                        var addDynamicContent = document.querySelector(`#BS--${friends.bStep}`);
                        var nameSpan = document.createElement("span");
                        nameSpan.setAttribute("id", "fact__name");
                        nameSpan.setAttribute("class", "section__fact");
                        nameSpan.textContent = friends['one'];
                        console.log(nameSpan);
                        var factSpan = document.createElement("span");
                        factSpan.setAttribute("id", "fact__fact");
                        factSpan.setAttribute("class", "section__fact");
                        factSpan.textContent = friends['encourage'];
                        console.log(factSpan)
                        addDynamicContent.append(nameSpan);
                        addDynamicContent.append(factSpan);
                    }

                    if (countFolk == 2) {
                        friends['one'] = [`${newArray[0]['firstName']} ${newArray[0]['lastName']} and `];
                        friends['two'] = [`${newArray[1]['firstName']} ${newArray[1]['lastName']}-`];
                        friends['encourage'] = `are also in Baby Step ${friends.bStep}`;
                        console.log(friends['one'] + friends['two'] + friends['encourage']);

                        var addDynamicContent = document.querySelector(`#BS--${friends.bStep}`);
                        var nameSpan = document.createElement("span");
                        nameSpan.setAttribute("id", "fact__name");
                        nameSpan.setAttribute("class", "section__fact");
                        nameSpan.textContent = friends['one'] + friends['two'];
                        console.log(nameSpan);
                        var factSpan = document.createElement("span");
                        factSpan.setAttribute("id", "fact__fact");
                        factSpan.setAttribute("class", "section__fact");
                        factSpan.textContent = friends['encourage'];
                        console.log(factSpan)
                        addDynamicContent.append(nameSpan);
                        addDynamicContent.append(factSpan);
                    }

                    if (countFolk == 3) {
                        numFolk = countFolk - 2;
                        friends['one'] = [`${newArray[0]['firstName']} ${newArray[0]['lastName']}`];
                        friends['two'] = [`, ${newArray[1]['firstName']} ${newArray[1]['lastName']}`];
                        friends['encourage'] = `, and ${numFolk} other friend are also in Baby Step ${friends.bStep}`;
                        console.log(friends['one'] + friends['two'] + friends['encourage']);

                        var addDynamicContent = document.querySelector(`#BS--${friends.bStep}`);
                        var nameSpan = document.createElement("span");
                        nameSpan.setAttribute("id", "fact__name");
                        nameSpan.setAttribute("class", "section__fact");
                        nameSpan.textContent = friends['one'] + friends['two'];
                        console.log(nameSpan);
                        var factSpan = document.createElement("span");
                        factSpan.setAttribute("id", "fact__fact");
                        factSpan.setAttribute("class", "section__fact");
                        factSpan.textContent = friends['encourage'];
                        console.log(factSpan)
                        addDynamicContent.append(nameSpan);
                        addDynamicContent.append(factSpan);
                    }
                    if (countFolk >= 4) {
                        numFolk = countFolk - 2;
                        friends['one'] = [`${newArray[0]['firstName']} ${newArray[0]['lastName']}`];
                        friends['two'] = [`, ${newArray[1]['firstName']} ${newArray[1]['lastName']}`];
                        friends['encourage'] = `, and ${numFolk} other friends are also in Baby Step ${friends.bStep}`;
                        console.log(friends['one'] + friends['two'] + friends['encourage']);

                        var addDynamicContent = document.querySelector(`#BS--${zerobs}`);
                        var nameSpan = document.createElement("span");
                        nameSpan.setAttribute("id", "fact__name");
                        nameSpan.setAttribute("class", "section__fact");
                        nameSpan.textContent = friends['one'] + friends['two'];
                        console.log(nameSpan);
                        var factSpan = document.createElement("span");
                        factSpan.setAttribute("id", "fact__fact");
                        factSpan.setAttribute("class", "section__fact");
                        factSpan.textContent = friends['encourage'];

                        addDynamicContent.append(nameSpan);
                        addDynamicContent.append(factSpan);
                    }
                }

                console.log("#" + lastTarget);
                var removeDynamicContent = document.querySelector("#" + lastTarget);
                var itIsGoneName = removeDynamicContent.querySelector('span#fact__name');
                var itIsGoneFact = removeDynamicContent.querySelector('span#fact__fact');
                console.log(itIsGoneName);
                console.log(itIsGoneFact);
                itIsGoneName.remove();
                itIsGoneFact.remove();
            }
        });
}