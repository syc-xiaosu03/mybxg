require.config({
  baseUrl:"/public/assets",
  paths : {
    jquery : "jquery/jquery",
    cookie : "jquery-cookie/jquery.cookie",
    template : "artTemplate/template-web",
    bootstrap:"bootstrap/js/bootstrap.min",
    datepicker : 'bootstrap-datepicker/js/bootstrap-datepicker.min',
    util:"../js/util",
    common : "../js/common",
    login : "../js/login",
    teacherlist:"../js/teacher-list",
    teacheradd:"../js/teacher-add"

    // require :'require/require's
  },
  shim:{
    bootstrap:["jquery"]
  }
})
