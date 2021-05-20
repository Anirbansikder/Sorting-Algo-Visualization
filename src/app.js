var arr = new Array(100);

const container = document.querySelector(".vertical-bars");

const reset_color = async() => {
	let bars = document.querySelectorAll(".bar");
	await new Promise((resolve) =>
		setTimeout(() => {
		resolve();
		}, 1000)
	);
	for(var i=0;i<bars.length;i++){
		bars[i].style.backgroundColor = "  rgb(24, 190, 255)";
	}
}

const enableButtons = async(idName) => {
	document.getElementById('head').innerHTML = `<I>${idName} Sort</I>`;
	document.getElementById('head').style.visibility = `visible`;
	document.getElementById('generate').disabled = true;
	document.getElementById('Selection').disabled = true;
	document.getElementById('Bubble').disabled = true;
	document.getElementById('Insertion').disabled = true;
	document.getElementById('Quick').disabled = true;
	document.getElementById('Merge').disabled = true;
	document.getElementById(`${idName}`).className += ' active';
}

const disableButtons = async(idName) => {
	document.getElementById('head').style.visibility = `hidden`;
    document.getElementById('generate').disabled = false;
	document.getElementById('Selection').disabled = false;
	document.getElementById('Bubble').disabled = false;
	document.getElementById('Insertion').disabled = false;
	document.getElementById('Quick').disabled = false;
	document.getElementById('Merge').disabled = false;
	document.getElementById(`${idName}`).classList.remove('active');
}

const generate_bars = () => {
	let bars = document.querySelectorAll(".bar");
	document.getElementById('head').style.visibility = `hidden`;
	if(bars.length>0){
		for(var i=0;i<100;i++){
			arr[i] = Math.floor((Math.random()*100)) + 1;
			bars[i].style.height = `${arr[i] * 4}px`;
		}
	} else {
		for(var i=0;i<100;i++){
			const value = Math.floor((Math.random()*100)) + 1;
			arr[i] = value;
			const bar = document.createElement('div');
			bar.classList.add('bar');
			bar.style.height = `${value * 4}px`;
			bar.style.transform = `translateX(${(i-50) * 10}px`;
			const barLabel = document.createElement("label");
			barLabel.classList.add("bar_id");
			barLabel.setAttribute("value", value);
			bar.appendChild(barLabel);
			container.appendChild(bar);
		}
	}
}

async function SelectionSort(delay = 300) {
	let bars = document.querySelectorAll(".bar");
	if(bars.length == 0){
		document.getElementById('head').innerHTML = `<I>Create An Array First</I>`;
		return;
	}
	await enableButtons('Selection');
    var min_idx = 0;
    for (var i = 0; i < bars.length; i += 1) {
		min_idx = i;
		bars[i].style.backgroundColor = "darkblue";
		for (var j = i + 1; j < bars.length; j += 1) {
			bars[j].style.backgroundColor = "red";
			await new Promise((resolve) =>
			setTimeout(() => {
				resolve();
			}, 300)
			);
			var val1 = arr[j];
			var val2 = arr[min_idx];
			if (val1 < val2) {
				if (min_idx !== i) {
					bars[min_idx].style.backgroundColor = " rgb(24, 190, 255)";
				}
				min_idx = j;
			} else {
				bars[j].style.backgroundColor = " rgb(24, 190, 255)";
			}
		}
		var temp1 = bars[min_idx].style.height;
		var temp2 = arr[min_idx];
		bars[min_idx].style.height = bars[i].style.height;
		bars[i].style.height = temp1;
		arr[min_idx] = arr[i];
		arr[i] = temp2;
		await new Promise((resolve) =>
			setTimeout(() => {
			resolve();
			}, 300)
		);
		bars[min_idx].style.backgroundColor = "  rgb(24, 190, 255)";
		bars[i].style.backgroundColor = " rgb(49, 226, 13)";
    }
	await reset_color();
	await disableButtons('Selection');
}

async function BubbleSort(delay = 1) {
	let bars = document.querySelectorAll(".bar");
	if(bars.length == 0){
		document.getElementById('head').innerHTML = `<I>Create An Array First</I>`;
		return;
	}
	await enableButtons('Bubble');
    for (var i = 0; i < bars.length; i += 1) {
		for (var j = 0; j < bars.length-i-1; j += 1) {
			bars[j].style.backgroundColor = "darkblue";
			bars[j+1].style.backgroundColor = "red";
			await new Promise((resolve) =>
			setTimeout(() => {
				resolve();
			}, 1)
			);
			if (arr[j] > arr[j+1]) {
				var temp1 = bars[j].style.height;
				bars[j].style.height = bars[j+1].style.height;
				bars[j+1].style.height = temp1;
				var temp2 = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp2;
				await new Promise((resolve) =>
					setTimeout(() => {
					resolve();
					}, 1)
				);
			}
			bars[j].style.backgroundColor = " rgb(24, 190, 255)";
		}
		bars[bars.length-i-1].style.backgroundColor = " rgb(49, 226, 13)";
    }
	await reset_color();
	await disableButtons('Bubble');
}

async function InsertionSort(delay = 1) {
	let bars = document.querySelectorAll(".bar");
	if(bars.length == 0){
		document.getElementById('head').innerHTML = `<I>Create An Array First</I>`;
		return;
	}
	await enableButtons('Insertion');
	bars[0].style.backgroundColor = " rgb(49, 226, 13)";
    for (var i = 1; i < bars.length; i += 1) {
		var key = arr[i];
		var key_height = bars[i].style.height;
		bars[i].style.backgroundColor = "darkblue";
		await new Promise((resolve) =>
		setTimeout(() => {
			resolve();
		}, 1)
		);
		var j = i-1;
		while(j>=0 && arr[j]>key){
			arr[j+1] = arr[j];
			bars[j+1].style.height = bars[j].style.height;
			bars[j+1].style.backgroundColor = " rgb(49, 226, 13)"
			bars[j].style.backgroundColor = "darkblue";
			j = j-1;
			await new Promise((resolve) =>
				setTimeout(() => {
				resolve();
				}, 1)
			);
		}
		arr[j+1] = key;
		bars[j+1].style.height = key_height;
		bars[j+1].style.backgroundColor = " rgb(49, 226, 13)";
	}
	await reset_color();
	await disableButtons('Insertion');
}

async function mergeArray(start,mid,end) {
	let bars = document.querySelectorAll(".bar");
	var n1 = mid - start + 1;
	var n2 = end - mid;
	var left = new Array(n1);
	var right = new Array(n2);
    for (var i = 0; i < n1; i+=1){
        left[i] = arr[start + i];
		bars[start+i].style.backgroundColor = "red";
		await new Promise((resolve) =>
			setTimeout(() => {
			resolve();
			}, 1)
		);
	}
    for (var j = 0; j < n2; j+=1){
        right[j] = arr[mid+1+j];
		bars[mid+1+j].style.backgroundColor = "yellow";
		await new Promise((resolve) =>
			setTimeout(() => {
			resolve();
			}, 1)
		);
	}
    var i = 0;
    var j = 0;
    var k = start;
    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
			bars[k].style.height = `${arr[k] * 4}px`;
			bars[k].style.backgroundColor = " rgb(49, 226, 13)";
            i++;
			await new Promise((resolve) =>
				setTimeout(() => {
				resolve();
				}, 1)
			);
        }
        else {
            arr[k] = right[j];
			bars[k].style.height = `${arr[k] * 4}px`;
			bars[k].style.backgroundColor = " rgb(49, 226, 13)";
            j++;
			await new Promise((resolve) =>
				setTimeout(() => {
				resolve();
				}, 1)
			);
        }
        k++;
    }
    while (i < n1) {
        arr[k] = left[i];
		bars[k].style.height = `${arr[k] * 4}px`;
		bars[k].style.backgroundColor = " rgb(49, 226, 13)";
        i++;
        k++;
		await new Promise((resolve) =>
			setTimeout(() => {
			resolve();
			}, 1)
		);
    }
    while (j < n2) {
        arr[k] = right[j];
		bars[k].style.height = `${arr[k] * 4}px`;
		bars[k].style.backgroundColor = " rgb(49, 226, 13)";
        j++;
        k++;
		await new Promise((resolve) =>
			setTimeout(() => {
			resolve();
			}, 1)
		);
    }
}

const mergeSortRec = async(start,end,delay=1) => {
	if(start<end){
		let mid = parseInt((start + end)/2);
		await mergeSortRec(start, mid);
		await mergeSortRec(mid + 1, end);
		await mergeArray(start,mid,end);
	}
}

async function MergeSort(delay = 1) {
	let bars = document.querySelectorAll(".bar");
	if(bars.length == 0){
		document.getElementById('head').innerHTML = `<I>Create An Array First</I>`;
		return;
	}
	await enableButtons('Merge');
    await mergeSortRec(0,99);
	await reset_color();
    await disableButtons('Merge');
}

const partition = async(low ,high) => {
	let bars = document.querySelectorAll(".bar");
    var pivot = arr[high];
	bars[high].style.backgroundColor = "darkblue";
	var i = low - 1;
	for(var j=low; j <= high-1; j += 1){
		if(i>=low){
			bars[i].style.backgroundColor = "red";
		}
		bars[j].style.backgroundColor = "yellow";
		if( arr[j] < pivot){
			i += 1;
			var temp1 = arr[j];
			arr[j] = arr[i];
			arr[i] = temp1;
			var temp2 = bars[j].style.height;
			bars[j].style.height = bars[i].style.height;
			bars[i].style.height = temp2;
			await new Promise((resolve) =>
				setTimeout(() => {
				resolve();
				}, 1)
			);
			if(i-1>=low){
				bars[i-1].style.backgroundColor = " rgb(24, 190, 255)";
			}
		}
		bars[j].style.backgroundColor = " rgb(24, 190, 255)";
	}
	if(i>=low){
		bars[i].style.backgroundColor = " rgb(24, 190, 255)";
	}
	bars[j].style.backgroundColor = " rgb(24, 190, 255)";
	var temp1 = arr[i+1];
	arr[i+1] = arr[high];
	arr[high] = temp1;
	var temp2 = bars[i+1].style.height;
	bars[i+1].style.height = bars[high].style.height;
	bars[high].style.height = temp2;
	bars[high].style.backgroundColor = " rgb(24, 190, 255)";
	await new Promise((resolve) =>
		setTimeout(() => {
		resolve();
		}, 1)
	);
    return i+1;
}

async function quickSortRec (low,high , delay = 1) {
	let bars = document.querySelectorAll(".bar");
	if(low<high){
		var j = await partition(low,high);
		bars[j].style.backgroundColor = " rgb(49, 226, 13)";
		await quickSortRec(low,j-1);
		await quickSortRec(j+1,high);
	}
}

async function QuickSort(delay = 1) {
	let bars = document.querySelectorAll(".bar");
	if(bars.length == 0){
		document.getElementById('head').innerHTML = `<I>Create An Array First</I>`;
		return;
	}
	await enableButtons('Quick');
    await quickSortRec(0,99);
	for(var i=0;i<100;i+=1){
		bars[i].style.backgroundColor = " rgb(49, 226, 13)";
	}
	await reset_color();
	await disableButtons('Selection');
}

