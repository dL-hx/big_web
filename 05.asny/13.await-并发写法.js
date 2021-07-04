//并发执行 
async function async_main() {
    try {
        console.log('beginTime:' + new Date().toLocaleString())
        let [get_foo, get_bar] = await Promise.all([foo(), bar()]);
        console.log(new Date().toLocaleString());
        console.log(get_foo);
        console.log(get_bar);
        console.log('endTime:' + new Date().toLocaleString())
    } catch (error) {
        console.log(error);
        
    }
}