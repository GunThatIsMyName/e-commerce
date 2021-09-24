export const formatPrice = (price) => {
    const newNumber= new Intl.NumberFormat('en-US',{
        style:"currency",
        currency:"USD"
    }).format(price/100)
    return newNumber;
}

export const getUniqueValues = () => {}
