var cur_width = 0;

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

  // 获取窗口初始参数

  cur_width = document.body.clientWidth;
}

function switch_box(box, mode) {
  // 必须使用匿名函数传参
  if (cur_width > 800) {
    if (mode == 1) {// show
      $(box).css("display", "block");
    } else {
      $(box).css("display", "none");
    }
  }
}

function my_resize() {
  console.log("resize");
}