const ingredientList = [];

$(document).ready(function () {
    window.onload = () => showList();

    const showList = async function () {
        await $.get("/api/manage/ingredients", (data) => {
            data.forEach(x => {
                ingredientList.push(x);
            });
        });
        const bodyList = $(".ingredient-list");
        $.each(bodyList, (x) => $(x).remove());
        ingredientList.forEach(x => {
            bodyList.append(`<tr class="list-item" id=${x.id}>
                                <th class="product-manage">
                                    <button class="btn btn-success" onclick="updateIngredients(${x.id})" name="delete">
                                        Update
                                    </button>
                                </th>
                                <th class="product-name">
                                    ${x.name}
                                </th>
                                <th class="product-price">
                                    ${x.price}
                                </th>
                                <th class="product-count-in-stock">
                                    ${x.countInStock}
                                </th>
                                <th>
                                    <button class="btn btn-danger" onclick="deleteIngredient(${x.id})" name="delete">
                                        Delete
                                    </button>
                                </th>
                            </tr>`);
        });
    }
});

const deleteIngredient = async function (id) {
    const items = $('.list-item');
    for (const item of items) {
        if ($(item).attr('id') == id) {
            item.remove();
        }
    }
    $.ajax({
        url: `/api/manage/ingredients/${id}`,
        type: 'DELETE'
    });
}

const createIngredient = async function (id){
    const bodyList = $(".ingredient-list");
    const items = $('.list-item');
    let updateItem;
    for (const item of items) {
        if ($(item).attr('id') == id) {
            updateItem = item;
        }
    }

    console.log(updateItem);
    const name = $(updateItem).children('.product-name').children('.update-name').val();
    const price = $(updateItem).children('.product-price').children('.update-price').val();
    const countInStock = $(updateItem).children('.product-count-in-stock').children('.update-count').val();

    const body = `{
        "name": "${name}",
        "price": ${price},
        "countInStock": ${countInStock}
    }`;

    const newItem = await $.ajax({
        url: `/api/manage/ingredients`,
        type: 'POST',
        data: body,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
    });

    updateItem.remove();
    bodyList.prepend(`<tr class="list-item" id=${newItem.id}>
                                <th class="product-manage">
                                    <button class="btn btn-success update-btn" onclick="updateIngredients(${newItem.id})" name="delete">
                                        Update
                                    </button>
                                </th>
                                <th class="product-name">
                                    ${newItem.name}
                                </th>
                                <th class="product-price">
                                    ${newItem.price}
                                </th>
                                <th class="product-count-in-stock">
                                    ${newItem.countInStock}
                                </th>
                                <th>
                                    <button class="btn btn-danger" onclick="deleteIngredient(${newItem.id})" name="delete">
                                        Delete
                                    </button>
                                </th>
                            </tr>`)
}

const addUpdatedIngredient = async function (id) {
    const bodyList = $(".ingredient-list");
    const items = $('.list-item');
    let updateItem;
    for (const item of items) {
        if ($(item).attr('id') == id) {
            updateItem = item;
        }
    }

    console.log(updateItem);

    const itemId = $(updateItem).attr('id');
    const name = $(updateItem).children('.product-name').children('.update-name').val();
    const price = $(updateItem).children('.product-price').children('.update-price').val();
    const countInStock = $(updateItem).children('.product-count-in-stock').children('.update-count').val();

    const body = `{
        "id": ${itemId},
        "name": "${name}",
        "price": ${price},
        "countInStock": ${countInStock}
    }`;

    const newItem = await $.ajax({
        url: `/api/manage/ingredients`,
        type: 'PUT',
        data: body,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
    });

    updateItem.remove();
    bodyList.prepend(`<tr class="list-item" id=${newItem.id}>
                                <th class="product-manage">
                                    <button class="btn btn-success update-btn" onclick="updateIngredients(${newItem.id})" name="delete">
                                        Update
                                    </button>
                                </th>
                                <th class="product-name">
                                    ${newItem.name}
                                </th>
                                <th class="product-price">
                                    ${newItem.price}
                                </th>
                                <th class="product-count-in-stock">
                                    ${newItem.countInStock}
                                </th>
                                <th>
                                    <button class="btn btn-danger" onclick="deleteIngredient(${newItem.id})" name="delete">
                                        Delete
                                    </button>
                                </th>
                            </tr>`)
}

$(document).on('click', '.add-ingredient', (e) => {
    const bodyList = $(".ingredient-list");
    bodyList.prepend(`<tr class="list-item" id=0>
                                <th class="product-manage">
                                    <button class="btn btn-success add-btn" onclick="createIngredient(0)">
                                        Save
                                    </button>
                                </th>
                                <th class="product-name">
                                    <input type="text" class="update-name-form update-name" placeholder="Name" aria-label="Recipient's username"
                                               aria-describedby="basic-addon2">
                                </th>
                                <th class="product-price">
                                    <input type="text" class="update-name-form update-price" placeholder="Price" aria-label="Recipient's username"
                                               aria-describedby="basic-addon2">
                                </th>
                                <th class="product-count-in-stock">
                                    <input type="text" class="update-name-form update-count" placeholder="count in stock" aria-label="Recipient's username"
                                               aria-describedby="basic-addon2">
                                </th>
                                <th>
                                    <button class="btn btn-danger" name="delete">
                                        Delete
                                    </button>
                                </th>
                            </tr>`);
});

const updateIngredients = function (id) {
    const bodyList = $(".ingredient-list");
    const items = $('.list-item');
    let updateItem;
    for (const item of items) {
        if ($(item).attr('id') == id) {
            updateItem = item;
        }
    }

    updateItem.remove();

    const name = $(updateItem).children('.product-name');
    const price = $(updateItem).children('.product-price');
    const countInStock = $(updateItem).children('.product-count-in-stock');

    bodyList.prepend(`<tr class="list-item" id=${id}>
                                <th class="product-manage">
                                    <button class="btn btn-success" onclick="addUpdatedIngredient(${id})" name="delete">
                                        Save
                                    </button>
                                </th>
                                <th class="product-name">
                                    <input type="text" class="update-name-form update-name" placeholder="Name" value="${name.text().trim()}" aria-label="Recipient's username"
                                               aria-describedby="basic-addon2">
                                </th>
                                <th class="product-price">
                                    <input type="text" class="update-name-form update-price" placeholder="price" value="${price.text().trim()}" aria-label="Recipient's username"
                                               aria-describedby="basic-addon2">
                                </th>
                                <th class="product-count-in-stock">
                                    <input type="text" class="update-name-form update-count" placeholder="count in stock" value="${countInStock.text().trim()}" aria-label="Recipient's username"
                                               aria-describedby="basic-addon2">
                                </th>
                                <th>
                                    <button class="btn btn-danger" name="delete">
                                        Delete
                                    </button>
                                </th>
                            </tr>`);
}