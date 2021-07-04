
// getSalary(12000,2000)
// getSalary(15000,3000)
// getSalary(15000,4000)

function makeSalary(base) {
    // 绩效
    return function (performance) {
        return base + performance
    }
    
}

let salaryLevel1 = makeSalary(12000)
let salaryLevel2 = makeSalary(15000)

// 级别1员工的总工资
console.log(salaryLevel1(2000));

// 级别2员工的总工资
console.log(salaryLevel2(5000));
