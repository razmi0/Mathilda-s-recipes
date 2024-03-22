# Todo

Add crud on recipe with a specialized reducer and hook (useRecipe):

- [x] Add a recipe ( dropdown ).
- [x] - [x] patch a recipe ( click on desc/name => replace with input => save on blur ).
- [x] - [x] delete a recipe ( add delete button and reveal on hover ).
- [x] scroll ingredients ( add a scroll bar when the list is too long ).
- [ ] make table collapsible with Ingredients and Instructions inside :

<details>
    <summary>Todo : table layout</summary>
    <table style="hidden">
        <tr>
            <th>Recipe</th>
            <th>Ingredients</th>
            <th>Instructions</th>
        </tr>
        <tr>
            <Accordion>
                <AccordionTrigger>
                    <td>chevron open</td>
                </AccordionTrigger>
                <AccordionContent>
                    <Ingredients />
                    <Instruction />
                </AccordionContent>
                <td>name</td>
                <td>description</td>
                <td>actions</td>
            </Accordion>
        </tr>
        <tr>
            <td>Recipe 2</td>
            <td>Ingredients 2</td>
            <td>Instructions 2</td>
        </tr>
    <table>
</details>
