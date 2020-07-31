var cur_width = 0;
var show_guide = -1;

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

  var menu_home = document.getElementById("menu_home");
  menu_home.addEventListener("click", function() {
    window.location.href = "/";
  });

  var menu_archive = document.getElementById("menu_archive");
  menu_archive.addEventListener("click", function() {
    window.location.href = "/archives";
  });

  var menu_guide = document.getElementById("menu_guide");
  var guide_box = document.getElementById("guide_box");
  if (menu_guide != null && guide_box != null) {
    menu_guide.addEventListener("click", function() {
      var right = $(guide_box).css("right");
      console.log(right);
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
    switch_box(search_result_box, 0);
  });

  // 搜索功能

  my_search("/search.xml", "search_input", "search_result_list");

  // 初始化函数

  my_resize();
  my_scroll();
}

function my_resize() {
  console.log("resize");

  cur_width = document.body.clientWidth;
}

function my_scroll() {
  console.log("scroll");

  change_guide();
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