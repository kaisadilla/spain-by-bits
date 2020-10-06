let datasets = {
    "population"      : {name: "Población"                      , dataset: population          },
    "unemployment"    : {name: "% de desempleo"                 , dataset: paro2020T2          },
    "life_expectancy" : {name: "Esperanza de vida"              , dataset: lifeExpectancy2019  },
    "average_salary"  : {name: "Salario medio"                  , dataset: avgSalary2017       },
    "rain"            : {name: "Precipitación anual"            , dataset: rain2015            },
    "temperature"     : {name: "Temperatura media anual"        , dataset: temp2015            },
    "sun_hours"       : {name: "Horas de sol anuales"           , dataset: sunHours2015        },
    "average_age"     : {name: "Edad promedio"                  , dataset: averageAge2020      },
    "immigration"     : {name: "% de inmigrantes"               , dataset: immigrationPerc2019 },
    "vehicles"        : {name: "Vehículos / 100 hab."           , dataset: vehiclesPC2019      },
    "companies"       : {name: "Compañías / 100 hab."           , dataset: companiesPC2019     },
    "alt_parties"     : {name: "% voto a partidos alternativos" , dataset: altParties2019N     },
    "cows"            : {name: "Ganado bovino"                  , dataset: cows2019N           },
    "pigs"            : {name: "Ganado porcino"                 , dataset: pigs2019N           },
    "pop_var"         : {name: "Variación en la población"      , dataset: popVar2009_2019     },
    "birth_rate"      : {name: "Nacimientos por mil"            , dataset: birthRate2019       },
    "tourists"        : {name: "Turistas"                       , dataset: tourists2017        },
    "dropout"         : {name: "% abandono escolar (2008)"      , dataset: dropoutRate2008     },
}

function fillMenus() {
    for (let [key, value] of Object.entries(datasets)) {
        document.getElementById("chart1").innerHTML += `<option value="${key}">${datasets[key].name}</option>`;
        document.getElementById("chart2").innerHTML += `<option value="${key}">${datasets[key].name}</option>`;
    }
}