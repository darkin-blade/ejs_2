/* 本地搜索器 */

var search_input;
var search_result_list;
var datas;

var each_length = 200;// 每篇文章显示的长度,可能靠后的关键词显示不了
var head_length = 10;// 每篇文章第一个关键字之前的长度

function my_search(path) {
  // path: hexo的search.xml路径
  $.ajax({
    url: path,
    dataType: "xml",
    success: function (xmlResponse) {// 获取search.xml(默认),在内部进行查找
      datas = $("entry", xmlResponse).map(function () {
        return {// 只获取纯文本
          title: $("title", this).text(),
          content: $("content", this).text(),
          url: $("url", this).text()
        };
      }).get();

      search_input = document.getElementById('search_input');
      search_result_list = document.getElementById('search_result_list');

      search_input.addEventListener('input', function() {
        get_match(1);
      });

      var filter_1 = document.getElementById("search_filter_1");
      var filter_2 = document.getElementById("search_filter_2");
      filter_1.addEventListener('click', function() {
        get_match(2);
      });
      filter_2.addEventListener('click', function() {
        get_match(1);
      });
    }
  });
}

function get_match(mode) {
  console.log("match " + mode);
  if (mode == 1) {
    // match content and title

    var str = '';
    var keywords = search_input.value.trim().toLowerCase().split(/[\s\-]+/);// 搜索的关键字(去除头尾空格),用`+`分割
    search_result_list.innerHTML = "";// 清空之前结果
    if (search_input.value.trim().length <= 0) {// 如果没有输入关键字
      return;
    }
    datas.forEach(function (data, index_data) {// 对每一篇文章进行匹配
      var isMatch = true;
      if (!data.title || data.title.trim() === '') {// 文章没有标题
        data.title = "Untitled";
      }
      var data_title = data.title.trim().toLowerCase();
      var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();// 文章内容
      if (index_data == 0) {
        // console.log("文章内容: " + data_content);
      }
      var data_url = data.url;
      var index_title = -1;
      var index_content = -1;
      var first_occur = -1;
      if (data_content !== '') {// 文章内容非空
        keywords.forEach(function (keyword, i) {// 对每个关键字查找第一次出现的位置, (当前元素, 索引, 正在操作的数组)
          index_title = data_title.indexOf(keyword);// 搜索关键字第一次出现的位置
          index_content = data_content.indexOf(keyword);

          if (index_title < 0 && index_content < 0) {// 关键字没有出现过
            // console.log(data_title + ":[" + index_title + ", " + index_content + "]")
            isMatch = false;
          } else {
            if (index_content < 0) {
              index_content = 0;
            }
            if (i == 0) {// 如果是第一次出现
              first_occur = index_content;// 记录第一次出现的位置
            }
          }
        });
      } else {// 文章为空
        isMatch = false;
      }
      if (isMatch) {
        // 显示文章标题
        str += "<a class='search_result_title' href='" + unescape(decodeURI(data_url)) + "'>" + data_title + "</a>";
        var content = data.content.trim().replace(/<[^>]+>/g, "");
        if (first_occur >= 0) {
          var start = first_occur - head_length;
          var end = each_length;

          if (start < 0) {// 如果关键字在文章很前面
            start = 0;
          }

          if (end + each_length > content.length) {// 不能超过文章长度
            end = content.length - each_length;
          }

          var match_content = content.substr(start, end);

          keywords.forEach(function (keyword) {// 高亮关键字
            var regS = new RegExp(keyword, "gi");
            match_content = match_content.replace(regS, "<strong class='search_highlight'>" + keyword + "</strong>");
          });

          str += "<a href='" + unescape(decodeURI(data_url)) + "'><p>" + match_content + "...</p></a>"
        }
        str += "";
      }
    });
    str += "";
    // console.log("搜所结果总长度" + str.length);
    if (str.length == 0) {// 判断有没有搜索结果
      search_result_list.innerHTML = "<span class='search_result_title'>Not found<span>";
    }
    search_result_list.innerHTML = str;
  } else if (mode == 2) {
    // only title
    var str = '';
    var keywords = search_input.value.trim().toLowerCase().split(/[\s\-]+/);// 搜索的关键字(去除头尾空格),用`+`分割
    search_result_list.innerHTML = "";// 清空之前结果
    if (search_input.value.trim().length <= 0) {// 如果没有输入关键字
      return;
    }
    datas.forEach(function (data, index_data) {// 对每一篇文章进行匹配
      var isMatch = true;
      if (!data.title || data.title.trim() === '') {// 文章没有标题
        data.title = "Untitled";
      }
      var data_title = data.title.trim().toLowerCase();
      if (index_data == 0) {
        // console.log("文章内容: " + data_content);
      }
      var data_url = data.url;
      var index_title = -1;
      var first_occur = -1;
      if (data_title !== '') {// 文章title非空
        keywords.forEach(function (keyword, i) {// 对每个关键字查找第一次出现的位置, (当前元素, 索引, 正在操作的数组)
          index_title = data_title.indexOf(keyword);// 搜索关键字第一次出现的位置

          if (index_title < 0) {// 关键字没有出现过
            isMatch = false;
          } else {
            if (index_title < 0) {
              index_title = 0;
            }
            if (i == 0) {// 如果是第一次出现
              first_occur = index_title;// 记录第一次出现的位置
            }
          }
        });
      } else {// 文章title为空
        isMatch = false;
      }
      if (isMatch) {
        // 显示文章标题
        if (first_occur >= 0) {          
          keywords.forEach(function (keyword) {// 高亮关键字
            var regS = new RegExp(keyword, "gi");
            data_title = data_title.replace(regS, "<strong class='search_highlight'>" + keyword + "</strong>");
          });
          
          str += "<a class='search_result_title_only' href='" + unescape(decodeURI(data_url)) + "'><p>" + data_title + "</p></a>";
        }
        str += "";
      }
    });
    str += "";
    // console.log("搜所结果总长度" + str.length);
    if (str.length == 0) {// 判断有没有搜索结果
      search_result_list.innerHTML = "<span class='search_result_title'>Not found<span>";
    }
    search_result_list.innerHTML = str;
  }
}