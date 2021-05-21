var arr = new Array(100);

const container = document.querySelector(".vertical-bars");

let no_of_bars = 100;
document.getElementById('formControlRangeArray').addEventListener('change' , (e) => {
	no_of_bars = e.target.value;
});

let speed = 300;
document.getElementById('formControlRangeSpeed').addEventListener('change' , (e) => {
	speed = 1000 - e.target.value*100;
	speed = speed == 0 ? 1 : speed;
});

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
	document.getElementById('Heap').disabled = true;
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
	document.getElementById('Heap').disabled = false;
	document.getElementById(`${idName}`).classList.remove('active');
}

const generate_bars = () => {
	document.getElementById('head').style.visibility = `hidden`;
	var parent = document.getElementById('vbars');
	while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
	for(var i=0;i<no_of_bars;i++){
		const value = Math.floor((Math.random()*100)) + 1;
		arr[i] = value;
		const bar = document.createElement('div');
		bar.classList.add('bar');
		bar.style.height = `${value * 4}px`;
		bar.style.transform = `translateX(${(i-parseInt(no_of_bars/2)) * (20 - parseInt(no_of_bars/10))}px`;
		bar.style.width = `${(20 - parseInt(no_of_bars/10)) - 4}px`;
		const barLabel = document.createElement("label");
		barLabel.classList.add("bar_id");
		barLabel.setAttribute("value", value);
		bar.appendChild(barLabel);
		container.appendChild(bar);
	}
}

const SelectionSort = async() => {
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
			}, speed)
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
			}, speed)
		);
		bars[min_idx].style.backgroundColor = "  rgb(24, 190, 255)";
		bars[i].style.backgroundColor = " rgb(49, 226, 13)";
    }
	await reset_color();
	await disableButtons('Selection');
}

const BubbleSort = async() => {
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
			}, speed)
			);
			if (arr[j] > arr[j+1]) {
				[arr[j] , arr[j+1]] = [arr[j+1] , arr[j]];
				[bars[j].style.height , bars[j+1].style.height] = [bars[j+1].style.height , bars[j].style.height]
				await new Promise((resolve) =>
					setTimeout(() => {
					resolve();
					}, speed)
				);
			}
			bars[j].style.backgroundColor = " rgb(24, 190, 255)";
		}
		bars[bars.length-i-1].style.backgroundColor = " rgb(49, 226, 13)";
    }
	await reset_color();
	await disableButtons('Bubble');
}

const InsertionSort = async() => {
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
			}, speed)
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
				}, speed)
			);
		}
		arr[j+1] = key;
		bars[j+1].style.height = key_height;
		bars[j+1].style.backgroundColor = " rgb(49, 226, 13)";
	}
	await reset_color();
	await disableButtons('Insertion');
}

const mergeArray = async(start,mid,end) => {
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
			}, speed)
		);
	}
    for (var j = 0; j < n2; j+=1){
        right[j] = arr[mid+1+j];
		bars[mid+1+j].style.backgroundColor = "yellow";
		await new Promise((resolve) =>
			setTimeout(() => {
			resolve();
			}, speed)
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
				}, speed)
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
				}, speed)
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
			}, speed)
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
			}, speed)
		);
    }
}

const mergeSortRec = async(start,end) => {
	if(start<end){
		let mid = parseInt((start + end)/2);
		await mergeSortRec(start, mid);
		await mergeSortRec(mid + 1, end);
		await mergeArray(start,mid,end);
	}
}

const MergeSort = async() => {
	let bars = document.querySelectorAll(".bar");
	if(bars.length == 0){
		document.getElementById('head').innerHTML = `<I>Create An Array First</I>`;
		return;
	}
	await enableButtons('Merge');
    await mergeSortRec(0,bars.length-1);
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
			[arr[i] , arr[j]] = [arr[j] , arr[i]];
			[bars[i].style.height , bars[j].style.height] = [bars[j].style.height , bars[i].style.height];
			await new Promise((resolve) =>
				setTimeout(() => {
				resolve();
				}, speed)
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
	[arr[i+1] , arr[high]] = [arr[high] , arr[i+1]];
	[bars[i+1].style.height , bars[high].style.height] = [bars[high].style.height, bars[i+1].style.height];
	bars[high].style.backgroundColor = " rgb(24, 190, 255)";
	await new Promise((resolve) =>
		setTimeout(() => {
		resolve();
		}, speed)
	);
    return i+1;
}

const quickSortRec = async(low,high) => {
	let bars = document.querySelectorAll(".bar");
	if(low<high){
		var j = await partition(low,high);
		bars[j].style.backgroundColor = " rgb(49, 226, 13)";
		await quickSortRec(low,j-1);
		await quickSortRec(j+1,high);
	}
}

const QuickSort = async() => {
	let bars = document.querySelectorAll(".bar");
	if(bars.length == 0){
		document.getElementById('head').innerHTML = `<I>Create An Array First</I>`;
		return;
	}
	await enableButtons('Quick');
    await quickSortRec(0,bars.length-1);
	for(var i=0;i<bars.length;i+=1){
		bars[i].style.backgroundColor = " rgb(49, 226, 13)";
	}
	await reset_color();
	await disableButtons('Quick');
}

const heapify = async(n,idx) => {
	let bars = document.querySelectorAll(".bar");
	var largest = idx;
	var low = 2*idx+1;
	var high = 2*idx+2;
	if (low < n && arr[low] > arr[largest])
        largest = low;
    if (high < n && arr[high] > arr[largest])
        largest = high;
    if (largest != idx) {
		[arr[idx] , arr[largest]] = [arr[largest] , arr[idx]];
		[bars[idx].style.height , bars[largest].style.height] = [bars[largest].style.height , bars[idx].style.height];
        heapify(n, largest);
    }
	await new Promise((resolve) =>
		setTimeout(() => {
		resolve();
		}, speed)
	);
}

const HeapSorting = async() => {
	let bars = document.querySelectorAll(".bar");
	for(var i = parseInt(bars.length/2)-1;i>=0;i-=1){
		bars[i].style.backgroundColor = "yellow";
		await heapify(bars.length,i);
		bars[i].style.backgroundColor = " rgb(24, 190, 255)";
	}
	await new Promise((resolve) =>
		setTimeout(() => {
		resolve();
		}, 500)
	);
	for(var i = bars.length-1;i>0;i-=1){
		[arr[0] , arr[i]] = [arr[i] , arr[0]];
		[bars[0].style.height , bars[i].style.height] = [bars[i].style.height , bars[0].style.height];
		bars[i].style.backgroundColor = " rgb(49, 226, 13)";
		bars[0].style.backgroundColor = "red";
		await new Promise((resolve) =>
			setTimeout(() => {
			resolve();
			}, speed)
		);
		await heapify(i,0);
		bars[0].style.backgroundColor = " rgb(24, 190, 255)";
	}
	bars[0].style.backgroundColor = " rgb(49, 226, 13)";
}

const HeapSort = async() => {
	let bars = document.querySelectorAll(".bar");
	if(bars.length == 0){
		document.getElementById('head').innerHTML = `<I>Create An Array First</I>`;
		return;
	}
	await enableButtons('Heap');
	await HeapSorting();
	await reset_color();
	await disableButtons('Heap');
}