var cur_width = 0;
var show_guide = -1;
var mouse_element = document.body;// 鼠标所在的元素

function my_load() {
  console.log("load");

  // 对菜单增加监听

  var menu_tags = document.getElementById("menu_tags");
  var tag_box = document.getElementById("tag_box");
  menu_tags.addEventListener("mousemove", function() {
    switch_box(tag_box, 1);
  });
  menu_tags.addEventListener("mouseleave", function() {
    switch_box(tag_box, 0);
  });
  tag_box.addEventListener("mousemove", function() {
    switch_box(tag_box, 1);
  });
  tag_box.addEventListener("mouseleave", function() {
    switch_box(tag_box, 0);
  });

  var menu_categories = document.getElementById("menu_categories");
  var category_box = document.getElementById("category_box");
  menu_categories.addEventListener("mousemove", function() {
    switch_box(category_box, 1);
  });
  menu_categories.addEventListener("mouseleave", function() {
    switch_box(category_box, 0);
  });
  category_box.addEventListener("mousemove", function() {
    switch_box(category_box, 1);
  });
  category_box.addEventListener("mouseleave", function() {
    switch_box(category_box, 0);
  });

  var menu_site = document.getElementById("menu_site");
  var site_box = document.getElementById("site_box");
  menu_site.addEventListener("mousemove", function() {
    switch_box(site_box, 1);
  });
  menu_site.addEventListener("mouseleave", function() {
    switch_box(site_box, 0);
  });
  site_box.addEventListener("mousemove", function() {
    switch_box(site_box, 1);
  });
  site_box.addEventListener("mouseleave", function() {
    switch_box(site_box, 0);
  });

  var menu_guide = document.getElementById("menu_guide");
  var guide_box = document.getElementById("guide_box");
  if (menu_guide != null && guide_box != null) {
    menu_guide.addEventListener("click", function() {
      var right = $(guide_box).css("right");
      if (show_guide == -1) {
        if (right == "-400px") {
          $(guide_box).css("right", "0px");
          show_guide = 1;
        } else {
          $(guide_box).css("right", "-400px");
          show_guide = 0;
        }
      } else {
        if (show_guide == 0) {
          $(guide_box).css("right", "0px");
          show_guide = 1;
        } else {
          $(guide_box).css("right", "-400px");
          show_guide = 0;
        }
      }
    });
  }

  var search_input = document.getElementById("search_input");
  var search_result_box = document.getElementById("search_result_box");
  search_input.addEventListener("focus", function() {
    switch_box(search_result_box, 1);
  });
  search_input.addEventListener("blur", function() {
    if (is_child(mouse_element, search_result_box)) {
      search_input.focus();
    } else {
      switch_box(search_result_box, 0);
    }
  });

  // 搜索功能

  my_search("/search.xml");

  // 初始化函数

  my_resize();
  my_scroll();
  my_highlight_start();// 代码块高亮
  if (cur_width > 1800) {
    // 自动弹出guide
    if (menu_guide != null) {
      menu_guide.click();
    }
  }
  change_scale();// 根据不同设备进行放缩

  // 手动添加监听, 防止初始化时报错

  document.body.onresize = my_resize;
  document.body.onscroll = my_scroll;
  document.body.onmouseover = my_mouseover;
}

function my_resize() {
  cur_width = document.body.clientWidth;

  var menu_preview = document.getElementById("menu_preview");
  var menu_tags = document.getElementById("menu_tags");
  var menu_categories = document.getElementById("menu_categories");
  var search_input_box = document.getElementById("search_input_box");
  // var menu_home = document.getElementById("menu_home");
  // var menu_archive = document.getElementById("menu_archive");
  // var menu_guide = document.getElementById("menu_guide");
  var menu_site = document.getElementById("menu_site");
  var menu_next = document.getElementById("menu_next");

  var tag_box = document.getElementById("tag_box");
  var category_box = document.getElementById("category_box");
  var search_result_box = document.getElementById("search_result_box");
  var site_box = document.getElementById("site_box");

  if (cur_width > 1090) {// 7 * 120 + 250
    // 完整显示
    $(menu_preview).css("display", "block");
    $(menu_tags).css("display", "block");
    $(menu_categories).css("display", "block");
    $(search_input_box).css("display", "block");
    $(menu_next).css("display", "block");
    $(tag_box).css("left", "120px");
    $(category_box).css("left", "240px");
    $(search_result_box).css("left", "360px");
    $(site_box).css("right", "120px");
  } else if (cur_width > 870) {// 2 * 120 + 630
    // 不显示上下页
    $(menu_preview).css("display", "none");
    $(menu_tags).css("display", "block");
    $(menu_categories).css("display", "block");
    $(search_input_box).css("display", "block");
    $(menu_next).css("display", "none");
    $(tag_box).css("left", "0px");
    $(category_box).css("left", "120px");
    $(search_result_box).css("left", "240px");
    $(site_box).css("right", "0px");
  } else if (cur_width > 750) {// 1 * 120 + 630
    // 不显示搜索
    $(menu_preview).css("display", "none");
    $(menu_tags).css("display", "block");
    $(menu_categories).css("display", "block");
    $(search_input_box).css("display", "none");
    $(menu_next).css("display", "none");
    $(tag_box).css("left", "0px");
    $(category_box).css("left", "120px");
    $(search_result_box).css("left", "240px");
    $(site_box).css("right", "0px");
  } else if (cur_width > 480) {
    // 只显示home, archive, site
    $(menu_preview).css("display", "none");
    $(menu_tags).css("display", "none");
    $(menu_categories).css("display", "none");
    $(search_input_box).css("display", "none");
    $(menu_next).css("display", "none");
    $(tag_box).css("left", "0px");
    $(category_box).css("left", "120px");
    $(search_result_box).css("left", "240px");
    $(site_box).css("right", "0px");
  } else {
    // 不处理
  }
}

function my_scroll() {
  if (typeof change_guide != "undefined") {
    // 如果有附加导航
    change_guide();
  }
}

function my_mouseover() {
  var event = window.event;
  mouse_element = event.target;
}

function switch_box(box, mode) {
  // 必须使用匿名函数传参
  var min_width = 0;
  if (box.id == "search_result_box") {
    min_width = 840;
  } else {
    min_width = 720;
  }
  if (cur_width > min_width) {
    if (mode == 1) {// show
      $(box).css("display", "block");
    } else {
      $(box).css("display", "none");
    }
  }
}

function change_scale() {// 根据不同的设备进行缩放
  if (navigator.userAgent.match("Android")) {// android
    document.body.style.zoom = 1.6;
  } else if (navigator.userAgent.match("Windows")) {// windows
    document.body.style.zoom = 0.85;
  } else if (navigator.userAgent.match("Mac")) {// macOS
    document.body.style.zoom = 0.8;
  }
}

function is_child(child, parent) {
  // 判断child是否是parent的子元素
  if (child == parent) {
    return true;
  } else if (child == null) {
    return false 
  } else {
    return is_child(child.parentElement, parent);
  }
}