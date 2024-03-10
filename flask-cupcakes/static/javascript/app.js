async function deleteCupcake() {
    const id = $(this).data('id');
    await axios.delete(`/api/cupcakes/${id}`)
    $(this).parent().remove()
}

$('.delete-cupcake').click(deleteCupcake)


async function createCupcake() {
    const flavor = $('#flavor').val()
    const size = $('#size').val()
    const rating = $('#rating').val()
    const image = $('#image').val()

    data = {
        "flavor": flavor,
        "size": size,
        "rating": rating,
        "image": image
    }

    await axios.post(`/api/cupcakes`, json = data)

    const li = `<li class="cupcakes">{{cupcake.id}} - <button class="btn btn-danger btn-sm delete-cupcake"
    data-id="{{cupcake.id}}">X</button></li>`

    $('ul').append(li)
}

$('.create-cupcake').click(createCupcake)