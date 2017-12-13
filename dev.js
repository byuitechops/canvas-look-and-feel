/*eslint-env node, browser, jquery*/

$(document).ready(function () {
  if (document.querySelector('.byui-custom') !== null) {
    document.querySelector('.byui-custom').insertAdjacentHTML('beforeend', '<link type="text/css" rel="stylesheet" href="https://byui.instructure.com/courses/' + courseNumber + '/file_contents/course%20files/Web%20Files/course-min.css" >')
  }
});

/****************************************
            Course List Generator
*****************************************/
if ($('#course-list-generator').length !== 0) {
  var generateButton = '<p><a id="generate" class="Button" href="#">Get Courses</a></p>';
  var courses;
  $.get('/api/v1/accounts', function (response) {
    var accounts = [];
    response.forEach(function (account) {
      accounts.push(account)
    })
    if (accounts.length > 0) {
      /* Get the list of accounts */
      $('#message').text('Select the account below:');
      $('#course-list-generator').append('<select id="accounts"><option selected="true" disabled="disabled"></option></select>');
      accounts.forEach(function (account) {
        if ($('#accounts #account_' + account.id).length !== 1) {
          $('#accounts').append('<option value="' + account.id + '" id="account_' + account.id + '">' + account.name + '</option>')
        }
      })

      /* Get the courses */
      $('#accounts').change(function () {
        if ($('#generate').length == 0) {
          $('#course-list-generator').append(generateButton);
          $('#generate').click(function () {
            courses = [];
            toggleLoading(true)
            var accountId = $('#accounts').val()
            getPage(accountId, 1)
          })
        }
      })
    }
  })

  function toggleLoading(isOn) {
    if (isOn) {
      $('#course-list-generator').append('<img style="position: absolute; top:0; right:10%;" id="loading" alt="Spinner.gif" src="https://byui.instructure.com/files/148227/download?download_frd=1&amp;verifier=CjywHoQiYwydKc9u6C2FiC59hqsCZqh6RppkTJP8"/>')
    } else {
      $('#loading').remove()
    }
  }

  function getPage(accountId, page) {
    $.get('/api/v1/accounts/' + accountId + '/courses?per_page=100&page=' + page, function (response, status, xhr) {
      courses = courses.concat(response)
      if (xhr.getAllResponseHeaders().includes('rel="next"')) {
        page++
        getPage(accountId, page)
      } else {
        generateDownload(courses)
      }
    })
  }

  function generateDownload(courses) {
    toggleLoading(false)

    var coursesCSV = "data:text/csv;charset=utf-8,";
    courses.forEach(function (course) {
      coursesCSV += course.id + "," + course.name + "," + course.course_code + "\r\n"
    })
    
    var download;
    if ($('#download').length === 0) {
      download = document.createElement("a")
      download.setAttribute("href", encodeURI(coursesCSV));
      download.setAttribute("class", "Button Button--primary");
      download.setAttribute("id", "download");
      download.innerHTML = "Download";
      download.setAttribute("download", "course_list_" + new Date().getTime() + ".csv")
      document.querySelector('#course-list-generator').appendChild(download)
    } else {
      download = document.getElementById("download")
      download.setAttribute("download", "course_list_" + new Date().getTime() + ".csv")
      download.setAttribute("href", encodeURI(coursesCSV));
    }
    $('#download').click()
  }
}
