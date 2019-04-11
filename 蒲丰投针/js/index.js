window.onload = function () {
    //获取标签
    var content = document.getElementById("content"),
        data = document.getElementById("data"),
        box = content.children[1],
        test = content.children[2],
        //子类标签
        rate = document.getElementById("rate"),
        lines = box.getElementsByClassName("line"),
        inp_num = test.children[1],
        begin = test.children[3],
        clear = test.children[4],
        num_all = document.getElementById("num_all"),
        num_suc = document.getElementById("num_suc"),
        pi = document.getElementById("pi"),
        //自定义属性
        number = 0,
        dis = 1000,
        pointX, pointY, high, y_other, y_middle;

    var prompt = document.createElement("span");
    rate.appendChild(prompt);

    //点击事件
    begin.onclick = function () {
        //获取数据
        var value = parseInt(inp_num.value);
        //检验数据
        if(typeof  value !== "number"  || isNaN(value) || value <= 0){
            inp_num.nextElementSibling.innerText = "请输入正确的投放针数";
            inp_num.nextElementSibling.className = "prompt";
            return;
        }else {
            inp_num.nextElementSibling.innerText = "";
            inp_num.nextElementSibling.className = "";
        }
        //根据数据创建标签
        for (var i = 0; i < value; i++) {
            //创建标签
            var span = document.createElement("span"),
                //x取值100-400(300) 50-350(300)
                x = Math.random() * 300 + 100,
                y = Math.random() * 300 + 50,
                //角度
                deg = parseFloat(Math.random() * 360);
            span.className = "needle";
            span.style.left = x + 'px';
            span.style.top = y + 'px';
            span.style.transform = "rotate(" + (deg) + "deg)";
            span.style.transformOrigin = "0% 0% 0";
            box.appendChild(span);
            //获取L和d的比例系数
            var rate_value = parseFloat(rate.children[0].value);
            //校验判断
            if(typeof  rate_value !== "number" || rate_value<=0 || isNaN(rate_value)||rate_value>1){
                // alert("请输入合适的 L/d ");
                prompt.innerText = "请在此输入合适的L/d";
                prompt.className = "prompt";
                return;
            }else {
                prompt.className = "";
                prompt.innerText = "";
            }

            span.style.height = rate_value * 100 + 'px';
            //针的垂直高度 L*sinθ
            high = span.offsetHeight * Math.cos(deg * 2 * Math.PI / 360);
            if (high < 0) {
                high = -high;
                y_other = y - high;//另一个顶点的y坐标
            } else {
                y_other = y + high
            }
            //中点的y坐标
            y_middle = ((y + y_other) / 2);
            //针的中点到最近一条平行线的距离 x
            for (var j = 0; j < lines.length; j++) {
                var line = lines[j],
                    offsetTop = y_middle - line.offsetTop;
                if (offsetTop < 0) {
                    offsetTop = -offsetTop;
                }
                if (offsetTop < dis) {
                    dis = offsetTop;
                }
            }
            if (dis <= high / 2) {
                number++;
            }
            //重置dis
            dis = 1000;
        }
        //投掷次数
        var value1 = parseInt(num_all.innerText) + parseInt(value);
        num_all.innerText = value1;
        //相交次数
        num_suc.innerText = number + "";
        //Π的近似值 ： 2*长度与间距的比值*投掷次数 / 相交次数
        if (number > 0) {
            pi.innerText = ((2 * rate_value * value1) / number).toPrecision(9);
        }
    };


    //清除事件
    clear.onclick = function () {
        var needles = box.getElementsByTagName("span");
        num_all.innerText = "0";
        num_suc.innerText = "0";
        pi.innerText = "0";
        //必须从后往前循环删除，否则由于索引变化无法删除全部
        for (var i = needles.length - 1; i >= 0; i--) {
            box.removeChild(needles[i]);
        }
        number = 0;
    };


    //获取当前坐标
    box.onmousemove = function (event) {
        var e = event || window.event;
        pointX = e.clientX - box.offsetLeft;
        pointY = e.clientY - box.offsetTop;
        data.innerHTML = "X:" + parseInt(pointX) + " Y:" + parseInt(pointY);
    };
    box.onmouseout = function () {
        data.innerHTML = "X: Y:";
    }
};