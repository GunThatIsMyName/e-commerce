export const formatPrice = (price) => {
    const newNumber= new Intl.NumberFormat('en-US',{
        style:"currency",
        currency:"USD"
    }).format(price/100)
    return newNumber;
}

export const getUniqueValues = (data,type) => {
    let category = data.map(item=>item[type]);
    if(type==="colors"){
        category = category.flat();
    }
    return ["all",...new Set(category)]
}
