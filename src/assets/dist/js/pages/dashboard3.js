/* global Chart:false */

const api = "http://avenida.vip/api";

var path = document.location.pathname.split("/");

if (path.length == 1) {
  let totale = -1;
  let atual = 0;

  $(function () {
    "use strict";

    var ticksStyle = {
      fontColor: "#495057",
      fontStyle: "bold",
    };

    var mode = "index";
    var intersect = true;

    async function getDados() {
      $.ajax({
        beforeSend: function (request) {
          request.setRequestHeader("token", "515bc476431ae037ad7edc32ba413f04");
        },
        dataType: "json",
        url: api + "/clientes/dashboard",
        success: function (data) {
          $(".total_clientes_geral").text(data.total);
          totale = data.total;
          inicia(totale);
          var tnow = data.total_now;
          var tlast = data.total_last;
          var cresc = (100 * (tnow - tlast)) / tlast;
          if (cresc < 0) {
            $(".sinal").removeClass("text-success").addClass("text-danger");
            $(".seta").removeClass("fa-arrow-up").addClass("fa-arrow-down");
          } else {
            $(".sinal").addClass("text-success").removeClass("text-danger");
            $(".seta").addClass("fa-arrow-up").removeClass("fa-arrow-down");
          }
          $(".cresc").text(cresc.toFixed(2));
          var $visitorsChart = $("#visitors-chart");
          // eslint-disable-next-line no-unused-vars
          var visitorsChart = new Chart($visitorsChart, {
            data: data,
            options: {
              maintainAspectRatio: false,
              tooltips: {
                mode: mode,
                intersect: intersect,
              },
              hover: {
                mode: mode,
                intersect: intersect,
              },
              legend: {
                display: false,
              },
              scales: {
                yAxes: [
                  {
                    // display: false,
                    gridLines: {
                      display: true,
                      lineWidth: "4px",
                      color: "rgba(0, 0, 0, .2)",
                      zeroLineColor: "transparent",
                    },
                    ticks: $.extend(
                      {
                        beginAtZero: true,
                        //suggestedMax: data.,
                      },
                      ticksStyle
                    ),
                  },
                ],
                xAxes: [
                  {
                    display: true,
                    gridLines: {
                      display: false,
                    },
                    ticks: ticksStyle,
                  },
                ],
              },
            },
          });
        },
        error: function (data) {
          console.error(data);
        },
      });

      //Pega os clientes por cidade
      $.ajax({
        beforeSend: function (request) {
          request.setRequestHeader("token", "515bc476431ae037ad7edc32ba413f04");
        },
        dataType: "json",
        url: api + "/clientes/clientesporcidade",
        success: function (data) {
          $(".cidades").empty();
          var t = "";
          var num = 1;
          for (let i = 0; i < data.length; i++) {
            const el = data[i];
            t += "<tr>";
            t += "<td>" + num + "</td>";
            t += "<td>" + el.cidade + "</td>";
            t += "<td>" + el.total + "</td>";
            t += "<td>";
            t += '<div class="progress progress-xs">';
            t +=
              '<div class="progress-bar progress-bar-info" style="width: ' +
              el.porcentagem +
              '%"></div>';
            t += "</div>";
            t += "</td>";
            t +=
              '<td><span class="badge bg-info">' +
              el.porcentagem +
              "%</span></td>";
            t += "</tr>";
            num++;
          }

          $(".cidades").append(t);
        },
      });

      $.ajax({
        beforeSend: function (request) {
          request.setRequestHeader("token", "515bc476431ae037ad7edc32ba413f04");
        },
        dataType: "json",
        url: api + "/clientes/ultimoscadastros",
        success: function (data) {
          $(".cadastros").empty();
          var t = "";
          var num = 1;
          for (let i = 0; i < data.length; i++) {
            const el = data[i];
            //55189 9702 8873
            var telefone1 = el.telefone.substring(0, 5);
            var telefone2 = "****";
            var telefone3 = el.telefone.substring(9, 13);
            var celular = telefone1 + telefone2 + telefone3;
            t += "<tr>";
            t += "<td>" + el.nome + "</td>";
            t += "<td>" + el.cidade + "</td>";
            t += "<td>" + celular + "</td>";
            t += "</tr>";
            num++;
          }

          $(".cadastros").append(t);
        },
      });
    }

    function inicia(val) {
      if (val !== totale) {
        totale = val;
        getDados();
      }
    }

    setInterval(function () {
      if (localStorage.getItem("real-time") === "1") {
        totalw();
        inicia(totale);
      } else {
        $("#customSwitch3").removeAttr("checked");
      }
    }, 50000);

    function totalw() {
      $.ajax({
        beforeSend: function (request) {
          request.setRequestHeader("token", "515bc476431ae037ad7edc32ba413f04");
        },
        dataType: "json",
        url: "http://avenida.vip/api/clientes/dashboardtotal",
        success: function (data) {
          inicia(data);
        },
      });
    }

    $("#customSwitch3").on("click", function (data) {
      if ($(this).is(":checked")) {
        localStorage.setItem("real-time", "1");
      } else {
        localStorage.setItem("real-time", "0");
      }
    });

    getDados();

    var realtime = localStorage.getItem("real-time");
    console.log(realtime);
    if (realtime === null || realtime === "1") {
      localStorage.setItem("real-time", "1");
      $("#customSwitch3").attr("checked", "checked");
    } else {
      $("#customSwitch3").removeAttr("checked");
    }
  });
}