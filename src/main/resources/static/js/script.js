const ingredientList = [];
const choiceIngredients = [];

$(document).ready(function () {
    window.onload = () => showList();

    const showList = async function () {
        await $.get("/api/ingredients", (data) => {
            data.forEach(x => {
                ingredientList.push(x);
            });
        });
        const bodyList = $(".ingredient-choice-form");
        $.each(bodyList, (x) => $(x).remove());
        ingredientList.forEach(x => {
            bodyList.append(`<div class="list-item" id=${x.id}>
                                <div class="product-manage">
                                    <input class="form-check-input fa-lg" type="checkbox" id="flexCheckDefault">
                                </div>
                                <div class="product-name">
                                    ${x.name}
                                </div>
                                <div class="product-price">
                                    ${x.price}
                                </div>
                            </div>`);
        });
    }
});

$(document).on('click', '.form-check-input', (e) => {
    const element = $(e.currentTarget).closest('.list-item');
    const priceElement = $(element).children('.product-price');
    const price = priceElement.text().trim();
    const priceCount = $('.price-count')

    let oldPrice = Number(priceCount.text());
    if ($(e.currentTarget).is(':checked')) {
        oldPrice += Number(price);
        choiceIngredients.push(element);
    } else {
        oldPrice -= Number(price);
        const index = ingredientList.indexOf(element);
        choiceIngredients.splice(index, 1);
    }

    priceCount.text(oldPrice);
});

$(document).on('click', '.create-order', (e) => {
    const name = $('.product-name').children('.form-control').val();
    const ingredients = [];
    choiceIngredients.forEach(x => ingredients.push(`{ "id" : ${x.attr('id')} }`));
    const body = `{
            "name": "${name}",
            "ingredients": [${ingredients}]
        }`

    $.ajax({
        url: `/api/order`,
        type: 'POST',
        data: body,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
    })

    location.reload();
});