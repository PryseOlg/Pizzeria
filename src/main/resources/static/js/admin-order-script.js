$(document).ready(function () {
    window.onload = () => showList();
    const ingredientList = []
    const showList = async function () {
        await $.get("/api/manage/order", (data) => {
            data.forEach(x => {
                ingredientList.push(x);
            });
        });
        const bodyList = $(".ingredient-list");
        $.each(bodyList, (x) => $(x).remove());
        ingredientList.forEach(x => {
            // console.log(x);
            const element = document.createElement('div');
            for (const ingredient of x.ingredients) {
                element.append(`
                <div class="sublist-item" id=${ingredient.id}>
                                <div class="ingredient-field-title">
                                    Name:
                                </div>
                                <div class="product-name order">
                                    ${ingredient.name}
                                </div>
                                <div class="ingredient-field-title">
                                    Price:
                                </div>
                                <div class="product-price order">
                                    ${ingredient.price}
                                </div>
                            </div>`);
            }

            bodyList.append(`<hr/>
                            <div class="list-item" id=${x.id}>
                                <div class="order-cell">
                                    <div class="order-title">
                                        Name: 
                                    </div>
                                    <div class="product-name order">
                                        ${x.name}
                                    </div>
                                </div>
                                <div class="order-cell">
                                    <div class="order-title">
                                        Ingredients: 
                                    </div>
                                    <div class="order-ingredient">
                                        ${element.innerText}
                                    </div>
                                </div>
                                <div class="order-cell">
                                    <div class="order-title">
                                        End price: 
                                    </div>
                                    <div class="product-price order">
                                        ${x.endPrice}
                                    </div>
                                </div>
                            </div>`);
        });
    }
});