// 全局变量
document.h_index = 0;// change.js中也有用到
document.root_guide = new Array();// 在dfs中的级数
// 结构体
var h_struct = {
  rank: 0,// 1 for h1, 2 for h2 ...
  name: ""// innerText
};
var my_guide = new Array();
var vertical_offset = 70;// 垂直方向的偏移

// 创建对象
function create_guide()
{
  var guide_list_box = document.getElementsByClassName("guide_list_box")[0];
  if (guide_list_box == null) {
    // 该页面没有导航
    return;
  }

  var guide_title = document.createElement("a");// 跳转至标题
  guide_title.innerText = document.getElementById("post_title").innerText;
  guide_title.innerHTML = "<span id='guide_title' class='guide_item'>" + guide_title.innerHTML + "</span>";

  dfs_h(document.body);// 搜索所有的1,2,3级标题
    
  var right_guide = document.createElement("div");
  right_guide.setAttribute("class", "right_guide");
  for (var i = 0; i < document.h_index; i ++)
  {// 设置序号和级数
    var temp_a = document.createElement("div");
    temp_a.id = "guide_" + i;
    temp_a.className = "guide_" + my_guide[i].rank;
    if (my_guide[i].is_root == 1) {// 是根标题
      temp_a.className += " " + "guide_root";
    }
    temp_a.innerHTML = "<a>" + my_guide[i].name.replace(/</g, "<&shy;") + "</a>";
    right_guide.appendChild(temp_a);
  }
  
  guide_list_box.appendChild(guide_title);
  document.querySelector("#guide_title").onclick = function() {
    scroll_to(document.querySelector("#post_title"));
  };
  guide_list_box.appendChild(right_guide);
  for (var i = 0; i < document.h_index; i ++) {
    document.querySelector("#guide_" + i).setAttribute("onclick", "section_scroll(" + i + ")");
  }

  find_root();
}

function find_root() {// 找出所有根guide
  var max_depth = 6;
  var root_len = 0;
  for (var i = 0; i < document.h_index; i ++) {
    var this_guide = document.getElementById("guide_" + i);
    var this_depth = 6;
    if (this_guide.className.match("guide_1") != null) {
      this_depth = 1;
    } else if (this_guide.className.match("guide_2") != null) {
      this_depth = 2;
    } else if (this_guide.className.match("guide_3") != null) {
      this_depth = 3;
    } else if (this_guide.className.match("guide_4") != null) {
      this_depth = 4;
    } else if (this_guide.className.match("guide_5") != null) {
      this_depth = 5;
    }
    if (this_depth <= max_depth) {// 是根guide
      this_guide.className += " guide_root";
      document.root_guide[root_len] = new Object();
      document.root_guide[root_len].cur = this_guide;
      document.root_guide[root_len].child = new Array();
      if (this_depth < max_depth) {
        max_depth = this_depth;
      }
      root_len ++;
    } else {
      document.root_guide[root_len - 1].child.push(this_guide);// 添加至尾部
    }
  }
}

function section_scroll(i)// 注意i的值
{
  scroll_to(document.querySelector("#section_" + i));
}

function scroll_to(element) {
  // element.scrollIntoView({
  //   block: "start",
  //   behavior: "smooth"
  // });
  var element_position = $(element).offset().top;
  window.scrollTo({
    top: element_position - vertical_offset,
    behavior: "smooth"
  })
}

// 深度优先搜索
function dfs_h(my_node) {
  var temp = 0;
  if (my_node.tagName == 'H1') {
    temp = 1;
  } else if (my_node.tagName == 'H2') {
    temp = 2;
  } else if (my_node.tagName == 'H3') {
    temp = 3;
  } else if (my_node.tagName == 'H4') {
    temp = 4;
  } else if (my_node.tagName == 'H5') {
    temp = 5;
  } if (temp != 0) {
    my_node.innerHTML = "<div id='section_" + document.h_index + "' class='section_" + temp + "'>" + my_node.innerHTML + "</div>";// 给文章中的section增加id
    document.h_index ++;
    var t_struct = Object.create(h_struct);
    t_struct.rank = temp;
    t_struct.name = my_node.innerText;
    my_guide.push(t_struct);// 注意数组传参的方式
  }

  var my_child = my_node.childNodes.length;
  for (var i = 0; i < my_child; i ++) {
    dfs_h(my_node.childNodes[i]);
  }
}

function change_guide() {
  var w_top = $(window).scrollTop();
  var guide_1 = null; // 待修改的索引
  var guide_2 = null;
  var guide_3 = null;
  var guide_4 = null;
  var guide_5 = null;

  for (var i = 0; i < document.h_index; i ++) { // 从上往下遍历
    var this_section = document.getElementById("section_" + i);
    var temp_offset = $("#section_" + i).offset().top - w_top;
    // console.log(i, temp_offset);
    if (temp_offset > 5 + vertical_offset) break;// 未到达的section(加上偏移)
    if (this_section.className.match("section_1") != null) { // 有可能会有其他class名,比如使用了mathjax
      guide_1 = document.getElementById("guide_" + i);// 注意id寻找
      guide_2 = null;
      guide_3 = null;
      guide_4 = null;
      guide_5 = null;
    } else if (this_section.className.match("section_2") != null) {
      guide_2 = document.getElementById("guide_" + i);
      guide_3 = null;
      guide_4 = null;
      guide_5 = null;
    } else if (this_section.className.match("section_3") != null) {
      guide_3 = document.getElementById("guide_" + i);
      guide_4 = null;
      guide_5 = null;
    } else if (this_section.className.match("section_4") != null) {
      guide_4 = document.getElementById("guide_" + i);
      guide_5 = null;
    } else if (this_section.className.match("section_5") != null) {
      guide_5 = document.getElementById("guide_" + i);
    }
  }

  // 进行高亮
  for (var i = 0; i < document.h_index; i ++)// h_index是section/guide的总数
  {
    var this_guide = document.getElementById("guide_" + i);
    if ((this_guide == guide_1)
      ||(this_guide == guide_2)
      ||(this_guide == guide_3)
      ||(this_guide == guide_4)
      ||(this_guide == guide_5)) {
      if (this_guide.className.match("active") == null) {// 本应该高亮而没有高亮
        $(this_guide).toggleClass("guide_active");// 开启active属性
      }
    } else {
      if (this_guide.className.match("active") != null) {// 本不应该高亮而高亮了
        $(this_guide).toggleClass("guide_active");// 关闭active属性
      }
    }
  }

  // 缩进修改
  var root_guide = document.root_guide;
  for (var i = 0; i < root_guide.length; i ++) {
    if (root_guide[i].cur.className.match("guide_active") != null) {// 被高亮
      for (var j = 0; j < root_guide[i].child.length; j ++) {
        $(root_guide[i].child[j]).css("display", "block");
      }
    } else {
      for (var j = 0; j < root_guide[i].child.length; j ++) {
        $(root_guide[i].child[j]).css("display", "none");
      }
    }
  }
}