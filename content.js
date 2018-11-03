console.log("X2 GPA Loaded");

// Parsing data

function filter_level(class_name) {
    if (class_name.includes('PLUS')) {
        return 'PLUS'
    }
    if (class_name.toLowerCase().includes('ap ')) {
        return 'AP'
    } 
    else if (class_name.toLowerCase().includes('h2')) {
        return 'H2'
    }
    else if (class_name.toLowerCase().slice(-2) == ' h') {
        return 'H'
    } else {
        return 'H3'
    }
}

var data_grid = document.querySelector("#dataGrid");
var list_cells = data_grid.querySelectorAll('.listCell');

var classes = [];

for (var c = 0; c <= list_cells.length; c++) {
    list_cols = list_cells[c];
    if (list_cols == undefined) {
        break;
    }

    list_rows = list_cols.querySelectorAll('td');

    classes.push({
        level: filter_level(list_rows[1].innerText.trim()),
        grade: parseFloat(list_rows[7].innerText.trim().replace(/\D\./g, '')),
    });
}

// Chart values
gpa_h3={100:4,99:3.9,98:3.85,97:3.8,96:3.75,95:3.7,94:3.65,93:3.6,92:3.5,91:3.4,90:3.35,89:3.3,88:3.25,87:3.15,86:3.1,85:3,84:2.9,83:2.8,82:2.7,81:2.6,80:2.5,79:2.4,78:2.3,77:2.2,76:2.1,75:2,74:1.9,73:1.8,72:1.7,71:1.6,70:1.5,69:1.4,68:1.3,67:1.2,66:1.1,65:1,64:.9,63:.8,62:.7,61:.6,60:.5},gpa_h2={100:4.2,99:4.1,98:4.05,97:4,96:3.95,95:3.9,94:3.85,93:3.8,92:3.7,91:3.6,90:3.55,89:3.5,88:3.45,87:3.35,86:3.3,85:3.2,84:3.1,83:3,82:2.9,81:2.8,80:2.7,79:2.6,78:2.5,77:2.4,76:2.3,75:2.2,74:2.1,73:2,72:1.9,71:1.8,70:1.7,69:1.6,68:1.5,67:1.4,66:1.3,65:1.2,64:1.1,63:1,62:.9,61:.8,60:.7},gpa_h={100:4.5,99:4.4,98:4.35,97:4.3,96:4.25,95:4.2,94:4.15,93:4.1,92:4,91:3.9,90:3.85,89:3.8,88:3.75,87:3.65,86:3.6,85:3.5,84:3.4,83:3.3,82:3.2,81:3.1,80:3,79:2.9,78:2.8,77:2.7,76:2.6,75:2.5,74:2.4,73:2.3,72:2.2,71:2.1,70:2,69:1.9,68:1.8,67:1.7,66:1.6,65:1.5,64:1.4,63:1.3,62:1.2,61:1.1,60:1},gpa_ap={100:4.7,99:4.6,98:4.55,97:4.5,96:4.45,95:4.4,94:4.35,93:4.3,92:4.2,91:4.1,90:4.05,89:4,88:3.95,87:3.85,86:3.8,85:3.7,84:3.6,83:3.5,82:3.4,81:3.3,80:3.2,79:3.1,78:3,77:2.9,76:2.8,75:2.7,74:2.6,73:2.5,72:2.4,71:2.3,70:2.2,69:2.1,68:2,67:1.9,66:1.8,65:1.7,64:1.6,63:1.5,62:1.4,61:1.3,60:1.2};


// Calculate GPA

var sum = 0;
var grades_length = classes.length;
var total_gpas = [];

for (c = 0; c <= classes.length; c++) {
    if (classes[c] != undefined) {
        if (!isNaN(classes[c].grade)) {
            sum += classes[c].grade;

            switch(classes[c].level) 
            {
                case 'H3':
                    total_gpas.push(gpa_h3[Math.round(classes[c].grade)])
                    classes[c].gpa = gpa_h3[Math.round(classes[c].grade)]
                    break;
                case 'H2':
                    total_gpas.push(gpa_h2[Math.round(classes[c].grade)])
                    classes[c].gpa = gpa_h2[Math.round(classes[c].grade)]
                    break;
                case 'H':
                    total_gpas.push(gpa_h[Math.round(classes[c].grade)])
                    classes[c].gpa = gpa_h[Math.round(classes[c].grade)]
                    break;
                case 'AP':
                    total_gpas.push(gpa_ap[Math.round(classes[c].grade)])
                    classes[c].gpa = gpa_ap[Math.round(classes[c].grade)]
                    break;
                default:
                    break;
            }
        }
        else {
            grades_length -= 1;
        }
    }
}

function add(a, b) {return a + b;}

avg_grade = Math.round(sum/grades_length * 100) / 100;
avg_gpa = Math.round(total_gpas.reduce(add, 0) / grades_length * 100) / 100;

document.querySelector("#bodytop").innerHTML = `
    <div class="tooltip">
        Average GPA: `+avg_gpa+`
        <span class="tooltiptext">`+JSON.stringify(classes, undefined, 2)+`</span>
    </div>
    <br/>
    Average Grade: `+avg_grade+`
`;

// Display GPAs side by side with grade

for (var c = 0; c <= list_cells.length; c++) {
    cols = list_cells[c].querySelectorAll('td');
    if (classes[c].gpa != undefined) {
        if (classes[c].gpa < 3.0)
            cols[7].innerHTML= cols[7].innerText + '<span style="color: red; float: right">'+classes[c].gpa+'</span>';
        else
            cols[7].innerHTML= cols[7].innerText + '<span style="color: green; float: right">'+classes[c].gpa+'</span>';
    }
}
