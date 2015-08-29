/**
 * 通用表单验证组件 of jQuery
 */

(function($){
	
	$.extend($.form.regValids,{
	
		/**object 类型的Valid至少存在check方法，而且check方法的返回值中的errorInfo属性作为判定标志*/
		IdCard : {
			area : {
				11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
				21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
				33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
				42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
				51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
				63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
			},
			check : function(card) {
				var fi = {errorInfo:"身份证号不合法"};
				
				/**基本验证*/
				if(/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(card)){
					fi.cardNum = true; 
				}else{
					return fi;
				}
				
				/**籍贯验证, 如果载入了area.js,使用ChinaAreaMap进行验证籍贯信息*/
				fi.area = window.ChinaAreaMap 
							? 
							window.ChinaAreaMap[card.substr(0,6)] 
							: 
							this.area[card.substr(0,2)];

				if(!fi.area) {
					return fi;
				}

				/**生日校验*/
				fi.birth = this.getBirthday(card);
				if (!fi.birth) {
					return fi;
				}
				/***检验位校验*/ 
				if (!this.checkParity(card)) {
					return fi;
				}
				/**性别校验 1:男、 0:女*/
				fi.sex = ( card.substring(16,17) | 0 ) % 2 ;

				fi.errorInfo = '';
				return fi;
			},
	
			// 校验位的检测
			checkParity : function(card) {
				// 15位转18位
				card = this.changeFivteenToEighteen(card);
				var len = card.length;
				if (len == '18') {
					var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
					var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
					var cardTemp = 0, i, valnum;
					for(i = 0; i < 17; i ++) {
						cardTemp += card.substr(i, 1) * arrInt[i];
					}
					valnum = arrCh[cardTemp % 11];
					if (valnum == card.substr(17, 1)) {
						return true;
					}
					return false;
				}
				return false;
			},
			// 15位转18位身份证号
			changeFivteenToEighteen : function(card) {
				if (card.length == '15') {
					var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
					var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
					var cardTemp = 0, i;
					card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
					for(i = 0; i < 17; i ++) {
						cardTemp += card.substr(i, 1) * arrInt[i];
					}
					card += arrCh[cardTemp % 11];
					return card;
				}
				return card;
			},
			
			// 提取生日
			getBirthday : function(card) {
				var len = card.length;
				// 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
				if (len == '15') {
					var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
					var arr_data = card.match(re_fifteen);
					return {
						year : '19' + arr_data[2],
						month : arr_data[3],
						day : arr_data[4]
					};
				}
				// 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
				if (len == '18') {
					var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
					var arr_data = card.match(re_eighteen);
					return {
						year : arr_data[2] | 0,
						month : arr_data[3] | 0,
						day : arr_data[4] | 0
					};
				}
				return false;
			}
		}
	});
	
})(jQuery);