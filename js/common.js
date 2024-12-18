$(function(){
	
	//載入loading  ==============================
	let iPercent = 0;
	function fnComplete(){
		$('body').removeClass('loading');
		$('.header').addClass('active');
	}

	function fnProgress(){
		iPercent = $(".queryloader__overlay__percentage").html();
		$(".loader .percent").html(iPercent);
		setTimeout(function(){
			$(".loader").fadeOut(300);
		}, 2500);
	}
	
	//初始化環境
	$("body").queryLoader2({
		percentage:true,
		barHeight : 0,
		fadeOutTime : 1000,
		minimumTime: 3000,
		onProgress: fnProgress,
		onComplete: fnComplete
	});


	let isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(webOS)|(Android)|(BlackBerry)/i);

	if($('html.index').length > 0){
		let controller = new ScrollMagic.Controller();

		//piece 進場動畫 ========================================
		$('.content .piece_1').each(function(){
			let duration = $(this).innerHeight();
			let ourScene = new ScrollMagic.Scene({
				triggerElement: this,
				duration: `${duration*1.8}px`, 
			})
				.setClassToggle(this, 'active')
				// .addIndicators({
				// 	name: 'fade scene',
				// 	colorTrigger: 'black',
				// 	indent: 0,
				// 	colorStart: 'red',
				// 	colorEnd: 'purple'
				// })
				.addTo(controller);
		});

		//menu_page li 進場動畫 ========================================
		$('.menu_page li').each(function(){
			// let duration = $(this).innerHeight();
			let ourScene = new ScrollMagic.Scene({
				triggerElement: this,
				duration: 3000, 
				triggerHook: 1
			})
				.setClassToggle(this, 'active')
				// .addIndicators({
				// 	name: 'fade scene',
				// 	colorTrigger: 'black',
				// 	indent: 0,
				// 	colorStart: 'red',
				// 	colorEnd: 'purple'
				// })
				.addTo(controller);
		});


		Chart.defaults.global.defaultFontColor = '#fff';
		Chart.defaults.global.defaultFontFamily = 'serif, "微軟正黑體", "Microsoft JhengHei UI", "Microsoft JhengHei", sans-serif';
		Chart.defaults.global.defaultFontSize = 15;
		Chart.defaults.global.elements.line.fill = false;
		Chart.defaults.global.animation.duration = 2000;
		// 國共內戰傷亡人數
		function chart_1(){
			let ctx = document.querySelector('#chart_box_1 .chart > canvas');
			let myChart = new Chart(ctx, {
				type: 'bar', //圖表種類
				data: {
					labels:  ['共產黨', '國民黨'], //X軸 
					datasets: [{ //Y軸 
						data: [111, 171],
						backgroundColor: ['#f95e5e', '#33ccff'],
						barPercentage: 0.4
					}]
				},
				options: {
					maintainAspectRatio: false, //寬RWD 高度固定
					legend: { //資料對應說明
						display: false,
					},
					scales: {
						xAxes: [{
							gridLines: {
								display: false
							},
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true, //從0開始
								min: 0, //最小
								stepSize: 50, //一階5
								callback: function (value, index, values) {
									return value + "萬";
								}
							},
							gridLines: {
								drawBorder: false, //圖表框線
								color: '#eee', // 格線顏色,
								borderDash: [5, 5],
								zeroLineColor: '#eee',
								zeroLineBorderDash: [5, 5],
								
							},
							// ticks: {
							// 	callback: function (value, index, values) {
							// 		return value + "萬";
							// 	}
							// }
						}]
					},
					tooltips: {
						enabled: true, //啟用
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						titleFontSize: 0,
						titleMarginBottom: 0,
						// bodyFontSize: isMobile ? 14 : 18,
						bodyFontColor: "#000", 
						xPadding: 10, //對話框 X軸 邊距
						yPadding: 10, //對話框 Y軸 邊距
						caretSize: 5, //箭頭 大小
						displayColors: false,
						callbacks: {
							label: function (tooltipItems, data) {
								return `${tooltipItems.xLabel}：${tooltipItems.yLabel}萬人`
							}
						}
					},
					plugins: {
						labels: {
							render: function (args) {
								return `${args.value}萬人`;
							},
							// fontSize: 15,
							fontColor: 'white',
							textMargin: 5,
						}
						
					}
				}
			
			});
		
		}

		// 國共兵力消長圖
		function chart_2(){
			Chart.defaults.global.elements.line.fill = false;
			let ctx = document.querySelector('#chart_box_2 .chart > canvas');
				let myChart = new Chart(ctx, {
					type: 'line', //圖表種類
					data: {
						labels:  ['1946年7月', '1948年6月', '1949年6月'], //X軸 
						datasets: [
							{
								label: '國民黨', //Y軸 
								data: [430, 365, 149], //Y軸 資料數字
								backgroundColor: '#4dccfe',
								borderColor: '#4dccfe',
								pointRadius: 8,
								pointHoverRadius: 8, //hover交錯點直徑大小
							},
							{
								label: '共產黨', //Y軸 
								data: [120, 280, 400], //Y軸 資料數字
								backgroundColor: '#f85e5e',
								borderColor: '#f85e5e',
								pointRadius: 8, 
								pointHoverRadius: 8, //hover交錯點直徑大小
							}
						]
					},
					options: {
						maintainAspectRatio: false, //寬RWD 高度固定
						elements: {
							line: {
								tension: 0, //貝茲曲線
							}
						},
						legend: { //資料對應說明
							position: 'bottom', //定位 'left'   'right'   'top'  'bottom'
							labels: { //說明標籤
								boxWidth: 10,
								padding: 20,
								usePointStyle: true
							}
						},
						scales: {
							xAxes: [{
								// scaleLabel: {
								// 	display: true,
								// 	labelString: "單位：（萬）人",
								// },
								gridLines: {
									display: false
								},
							}],
							yAxes: [{
								ticks: {
									beginAtZero: true, //從0開始
									min: 0, //最小
									stepSize: 100, //一階5
									callback: function (value, index, values) {
										return value + "萬";
									}
								},
								gridLines: {
									drawBorder: false, //圖表框線
									color: '#eee', // 格線顏色,
									borderDash: [5, 5],
									zeroLineColor: '#eee',
									zeroLineBorderDash: [5, 5],
									
								}
							}]
						},
						tooltips: {
							enabled: true, //啟用
							backgroundColor: 'rgba(255, 255, 255, 0.9)',
							titleFontSize: 0,
							titleMarginBottom: 0,
							bodyFontSize: 14,
							bodyFontColor: "#000", 
							xPadding: 10, //對話框 X軸 邊距
							yPadding: 10, //對話框 Y軸 邊距
							caretSize: 5, //箭頭 大小
							displayColors: false,
							callbacks: {
								label: function (tooltipItems, data) {
									// return `${data.datasets[tooltipItems.datasetIndex].label}${tooltipItems.xLabel}：${tooltipItems.yLabel}萬人`
		
		
									return [data.datasets[tooltipItems.datasetIndex].label, tooltipItems.xLabel, tooltipItems.yLabel+'萬人'];
								}
							}
		
							/*
							callback: function (value, index, values) {
									return "第" + value + "週";
								}
							*/
						}
					}
				
				});
				
		}

		// 榮民有無眷屬
		function chart_5(){
			Chart.defaults.global.elements.line.fill = true;
			let labels = [];
			for(let i = 84; i <= 107; i++ ){
				labels.push(i);
			}
		
			let ctx = document.querySelector('#chart_box_5 .chart > canvas');
			let myChart = new Chart(ctx, {
				type: 'line', //圖表種類
				data: {
					labels: labels, //X軸 
					datasets: [
						{
								label: '有眷', //Y軸 
								data: [446199,443568,448264,442247,427679,421951,437703,441749,436613,430582,425252,419613,412119,405898,398640,394047,385551,376823,369037,359795,350413,342217,332863,322233], //Y軸 資料數字
								backgroundColor: '#f85e5e',
								borderColor: '#f85e5e',
								pointRadius: 1,
								pointBackgroundColor: 'rgba(248, 94, 94, 1)',
								// pointBorderColor: 'rgba(248, 94, 94, 0)',
								// pointHoverBackgroundColor: 'rgba(248, 94, 94, 1)',

							},
						{
							label: '單身', //Y軸 
							data: [136348,130838,120072,116403,142163,138420,123596,107480,100558,94935,88231,82849,79415,76204,72666,67588,65157,62409,58887,54458,51258,46571,42476,37792], //Y軸 資料數字
							backgroundColor: '#4dccfe',
							borderColor: '#4dccfe',
							pointRadius: 1,
							pointBackgroundColor: 'rgba(77, 204, 254, 1)',
							// pointBorderColor: 'rgba(77, 204, 254, 0)',
							// pointHoverBackgroundColor: 'rgba(77, 204, 254, 1)',
						}					
					]
				},
				options: {
					maintainAspectRatio: false, //寬RWD 高度固定
					elements: {
						point: {
							pointStyle: 'circle',
							//'circle' 圓點   //'triangle' 三角形   //'rect' 方形   //'rectRounded' 帶圓角的方形  //'rectRot' 菱形  //'cross' 十字   //'crossRot' X字  //'star' 星形 //'line' 線  //'dash' 虛線
							backgroundColor: 'rgba(255, 0, 0, 0.5)', 
							borderColor: 'rgba(0, 0, 0, 0.1)'
						},
						line: {
							tension: 0, //貝茲曲線
						}
					},
					legend: { //資料對應說明
						position: 'bottom', //定位 'left'   'right'   'top'  'bottom'
						labels: { //說明標籤
							boxWidth: 10,
							padding: 20,
							usePointStyle: true
						}
					},
					scales: {
						xAxes: [{
							// display: false,
							stacked: true, //堆疊
							// scaleLabel: {
							// 	display: true,
							// 	labelString: "單位：（萬）人",
							// },
							gridLines: {
								display: false
							},
							ticks: {
								callback: function (value, index, values) {
									return `${value }年`;
								}
							}
						}],
						yAxes: [{
							// display: false,
							stacked: true,
							ticks: {
								beginAtZero: true, //從0開始
								min: 0, //最小
								stepSize: 100, //一階5
							},
							gridLines: {
								display: false							
							},
							ticks: {
								callback: function (value, index, values) {
									return `${value / 10000}萬`; //單位萬
								}
							}
						}]
					},
					tooltips: {
						// enabled: false, //禁用
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						titleFontSize: 0,
						titleMarginBottom: 0,
						bodyFontSize: 14,
						bodyFontColor: "#000", 
						xPadding: 10, //對話框 X軸 邊距
						yPadding: 10, //對話框 Y軸 邊距
						caretSize: 0, //箭頭 大小
						callbacks: {
							label: function (tooltipItems, data) {
								return `${data.datasets[tooltipItems.datasetIndex].label}/${tooltipItems.xLabel}年：${tooltipItems.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}人`
							}
						}
					}
				}
			
			});
			
		}

		// 六張犁亂葬崗省籍比例
		function chart_6(){
			let ctx = document.querySelector('#chart_box_6 .chart > canvas');
			let myChart = new Chart(ctx, {
				type: 'pie', //圖表種類
				data: {
					labels: ['外省籍', '本省籍', '不明'], //項目 
					datasets: [{ //數據 資料 
						data: [63, 50, 61],
						backgroundColor: ['#77c4ff', '#66ffcc', '#e8e6f2'],
					}]
				},
				options: {
					maintainAspectRatio: false, //寬RWD 高度固定
					legend: { //資料對應說明
						display: false
					},
					// animation: {
					// 	duration: 2000,
					// 	//easing: 'easeInOutBack'
					// },
					tooltips: {
						enabled: false, //啟用
					// 	backgroundColor: 'rgba(255, 255, 255, 0.9)',
					// 	titleFontSize: 0,
					// 	titleMarginBottom: 0,
					// 	bodyFontSize: 14,
					// 	bodyFontColor: "#000", 
					// 	xPadding: 10, //對話框 X軸 邊距
					// 	yPadding: 10, //對話框 Y軸 邊距
					// 	caretSize: 0, //箭頭 大小
					// 	displayColors: false,
					// 	callbacks: {
					// 		label: function (tooltipItems, data) {
					// 			let total = data.datasets[0].data.reduce(function(prev, current, currentIndex) {
					// 				return prev + current;
					// 			});
								
					// 			let currentIndex = tooltipItems.index;
					// 			let currentName = data.labels[currentIndex];
					// 			let currentValue = data.datasets[0].data[currentIndex];
					// 			let percentage = ((currentValue/total) * 100).toFixed(1);
					// 			return [ currentName, currentValue+'座', percentage+'%'];
					// 		}
					// 	}
					},
					plugins: {
						labels: {
							render: function (args) {
								return `${args.label}: ${args.value}座\n${args.percentage}%`;
							},
							precision: 1,
							fontSize: 18,
							fontColor: ['black', 'black', 'black'],
							position: 'default'
						}
					}
				}
			
			});
			
		}

		// 榮民數量趨勢圖
		function chart_7(){
			let data = {
				labels:  [], //X軸 
				datasets: [{ //Y軸 
					label: '建在', 
					data: [412425, 398414, 385435, 371359, 366968, 352593, 345142, 331110, 317126, 302769, 287277, 272901, 258882, 244754, 231025, 216996, 202374, 187112, 171328, 154877, 138731, 121632, 106512, 91583, 80341],
					backgroundColor:'#f08549',
					fontColor: '#fff',
				}]
			};
		
			let options = {
				maintainAspectRatio: false, //寬RWD 高度固定
				// animation: {
				// 	duration: 2000,
				// 	//easing: 'easeInOutBack'
				// },
				title: { 
					display: false
				},
				scales: {
					xAxes: [{
						gridLines: {
							display: isMobile ? true : false,
							drawBorder: false, //圖表框線
							color: '#eee', // 格線顏色,
							borderDash: [5, 5],
							zeroLineColor: '#eee',
							zeroLineBorderDash: [5, 5],
							
						},
						ticks: {
							callback: function (value, index, values) {
								if(isMobile){
									return `${value / 10000}萬`; //單位萬
								}else{
									return value + '年';
								}
								
							}
						}
					}],
					yAxes: [{
						gridLines: {
							display: isMobile ? false : true,
							drawBorder: false, //圖表框線
							color: '#eee', // 格線顏色,
							borderDash: [5, 5],
							zeroLineColor: '#eee',
							zeroLineBorderDash: [5, 5],
							
						},
						ticks: {
							callback: function (value, index, values) {
								if(!isMobile){
									return `${value / 10000}萬`; //單位萬
								}else{
									return value + '年';
								}
								
							}
						}
					}]
				},
				legend: { //資料對應說明
					display: false,
					// labels: { //說明標籤
					// 	boxWidth: 8,
					// 	usePointStyle: true
					// }
				},
				tooltips: {
					enabled: true, //啟用
					// mode: 'point', //交錯點顯示規則
					backgroundColor: 'rgba(255, 255, 255, 0.9)',
					titleFontSize: 0,
					titleMarginBottom: 0,
					bodyFontSize: 14,
					bodyFontColor: "#000", 
					xPadding: 10, //對話框 X軸 邊距
					yPadding: 10, //對話框 Y軸 邊距
					caretSize: 5, //箭頭 大小
					displayColors: false,
					callbacks: {
						label: function (tooltipItems, data) {
							if(isMobile){
								return `${tooltipItems.yLabel}年：${tooltipItems.xLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}人`;
							}else{
								return `${tooltipItems.xLabel}年：${tooltipItems.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}人`;
							}
						}
					}
				},
				plugins: {
					labels: {
						render: function (args) {
							return `${args.value}人`;
						},
						fontSize: 0,
						fontColor: 'white',
						textMargin: 5,
					}
					
				}
			}
			
			
			for(let i = 84; i <= 108; i++){
				data.labels.push(i);
			}
			
		
			new Chart( document.querySelector('#chart_box_7 .chart > canvas'), {
				type: isMobile ? 'horizontalBar' :'bar', //圖表種類  bar, horizontalBar, pie, doughnut, line, radar, polarArea
				data: data,
				options: options
			});
		}


		//用each ========================================
		$('.chart_box').each(function(index, el){
			
			let activeChart = $(this).attr('id');
			
			let ourScene = new ScrollMagic.Scene({
				triggerElement: this,
				duration: '1500px', 
				triggerHook: 0.5
			})
				.setClassToggle(this, 'active')
				.on('start', function(){
					switch (true) {
						case activeChart === 'chart_box_1':
							chart_1()
							break;
						case activeChart === 'chart_box_2':
								chart_2()
								break;
						case activeChart === 'chart_box_5':
								chart_5()
								break;
						case activeChart === 'chart_box_6':
								chart_6()
								break;
						case activeChart === 'chart_box_7':
							chart_7()
								break;
						default:
							break;
					}
				})
				.on("leave", function (event) {
				})
				.on('end', function(){
				})
				// .addIndicators({
				// 	name: 'fade scene',
				// 	colorTrigger: 'black',
				// 	indent: 0,
				// 	colorStart: 'red',
				// 	colorEnd: 'purple'
				// })
				.addTo(controller);
		});
	}	


	// 選單開關 ========================
	$('.header .btn_switch').on('click', function(){
		$(this).toggleClass('active');
		$('.wrapper_box .nav_1').toggleClass('active');
		$(this).parents('.wrapper_box').toggleClass('active');
	});
	

	// 滾動進度條 ========================
	$(window).on("scroll resize", function(){
		requestAnimationFrame(function(){
			var totalScroll = $("body").innerHeight() - $(window).innerHeight(); //全部滾動的距離
			var progressScroll = $(window).scrollTop(); //已滾
			var percent = progressScroll / totalScroll; //滾動比例
			$(".scrollTrack .inner").css({ width: `${percent * 100}%` });
		});
	}).trigger("scroll");



	// gototop ============================
	let $goToTop = $(".gototop");
	let iScrollPointA = 0;  //滾回的位置
	let iScrollPointB = 20; //滾到的位置 出現gototop
	
	//滾動事件
	let oScrollTimer = null;
	$(window).on("scroll", function(){

		if(oScrollTimer){
			clearTimeout(oScrollTimer);
		}
		oScrollTimer = setTimeout(function(){
							if( $(window).scrollTop() > iScrollPointB) {
								$goToTop.css({"opacity":"1", "bottom":"50px"});	
							} else {
								$goToTop.css({"opacity":"0", "bottom":"10px"});	
							}
						}, 200);
	});
	
	// 讓捲軸用動畫的方式移動到到指定id位罝
	$goToTop.on("click", function(){
		let $body = (window.opera) ? (document.compatMode === "CSS1Compat" ? $('html') : $('body')) : $('html,body'); //修正 Opera 問題
		$body.animate({scrollTop: iScrollPointA}, 150);
		return false;
	});



});







