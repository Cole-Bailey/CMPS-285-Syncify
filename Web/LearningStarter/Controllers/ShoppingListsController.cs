﻿using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Reflection.Metadata.Ecma335;

namespace LearningStarter.Controllers
    
{
    [ApiController]
    [Route("api/shopping-lists")]
    public class ShoppingListsController : ControllerBase
    {
        private DataContext _dataContext;
        public ShoppingListsController(
            DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var response = new Response();

            var shoppingListsToReturn = _dataContext
                .ShoppingLists
                .Select(x => new ShoppingListGetDto
                {
                    Id = x.Id,
                    Name = x.Name,
                })
                .ToList();

            response.Data = shoppingListsToReturn;

            return Ok(response);
        }
        // /api/shopping-lists/(name)/(id)
        [HttpGet("{id:int}")]
        public IActionResult GetById([FromRoute]int id)
        {
            var response = new Response();


            if (id <= 0 )
            { 
                response.AddError("id", "Cannot be less than or equal to zero.");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            var shoppingListFromDatabase = _dataContext
                .ShoppingLists
                .FirstOrDefault(x => x.Id == id);

            if (shoppingListFromDatabase == null)
            {
                response.AddError("id,", "No shopping list found");
                return NotFound(response);
                //404 response, no data
            }


            var shoppingListToReturn = new ShoppingListGetDto
            {
                Id = shoppingListFromDatabase.Id,
                Name = shoppingListFromDatabase.Name
            };

            response.Data = shoppingListToReturn;

            return Ok(response);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ShoppingListCreateDto shoppingListCreateDto)
        {
            var response = new Response();

            if (shoppingListCreateDto == null )
            {
                response.AddError("", "Critical error.");
                return BadRequest(response);
            }
            if (shoppingListCreateDto.Name == null || shoppingListCreateDto.Name == "")
            {
                response.AddError("name", "Name cannot be empty");
                return BadRequest(response);
            }
            var shoppingListAlreadyExistsInDatabase = _dataContext.ShoppingLists.Any(x => x.Name == shoppingListCreateDto.Name);

            if (shoppingListAlreadyExistsInDatabase)
            {
                response.AddError("name", "Already exists in ShoppingList.");
            }
            if (response.HasErrors)
            {
                return BadRequest(response);
            }


            var shoppingListToCreate = new ShoppingList()
            {
                Name = shoppingListCreateDto.Name,
               // User = shoppingListCreateDto.User,
            };

            _dataContext.ShoppingLists.Add(shoppingListToCreate);
            _dataContext.SaveChanges();

            var shoppingListToReturn = new ShoppingListGetDto
            {
                Id = shoppingListToCreate.Id,
                Name = shoppingListToCreate.Name
            };

            //returns 201 Code, which means created
            return Created("api/shoppingLists/" + shoppingListToCreate.Id,
                shoppingListToReturn);
        }
        // introduce a HttpPut method
        [HttpPut("{id:int}")]

        public IActionResult Update(
            [FromRoute] int id,
            [FromBody] ShoppingListUpdateDto shoppingListUpdateDto)
        {
            var response = new Response();

            var shoppingListToUpdate = _dataContext
                .ShoppingLists
                .FirstOrDefault(shoppingList => shoppingList.Id == id);

            if(shoppingListToUpdate == null)
            {
                response.AddError("id", "Shopping List Item not found, try another Id");
            }

            shoppingListToUpdate.Name = shoppingListUpdateDto.Name;

            _dataContext.SaveChanges();

            var shoppingList = _dataContext
                .ShoppingLists
                .FirstOrDefault(x => x.Id == shoppingListToUpdate.Id);

            var shoppingListToReturn = new ShoppingListGetDto
            {
                Id = shoppingListToUpdate.Id,
                Name = shoppingListToUpdate.Name,
            };

            response.Data = shoppingListToReturn;
            return Ok(response);

        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var response = new Response();

            var shoppingListToDelete = _dataContext
                .ShoppingLists
                .FirstOrDefault(shoppingList => shoppingList.Id == id);
            if (shoppingListToDelete == null)
            {
                response.AddError("id", "Shopping List Item not found.");
                return BadRequest(response);
            }

            _dataContext.Remove(shoppingListToDelete);
            _dataContext.SaveChanges();

            response.Data = true;
            return Ok(response);
        }
    }
}
