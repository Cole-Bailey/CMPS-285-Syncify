﻿using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/group")]
    public class GroupController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public GroupController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var response = new Response();
            var groups = _dataContext.Groups.Select(groups => new GroupGetDto
            {
                Id = groups.Id,
                Name = groups.Name,
                Image = groups.Image
            })
            .ToList();

            response.Data = groups;

            return Ok(response);

        }
        [HttpPost]
        public IActionResult Create([FromBody] GroupCreateDto orderCreateDto)
        {
            var response = new Response();
            var groupToAdd = new Group
            {
                Name = orderCreateDto.Name,
                Image = orderCreateDto.Image
            };
            _dataContext.Groups.Add(groupToAdd);
            _dataContext.SaveChanges();
             
            var groupToReturn = new GroupGetDto()
            {
                Id = groupToAdd.Id,
                Name = groupToAdd.Name,
                Image = groupToAdd.Image
            };
            response.Data = groupToReturn;
            return Created("", response);
        }
        [HttpPut("{id:int}")]
        public IActionResult
            Update([FromRoute] int id,
            [FromBody] GroupUpdateDto groupUpdateDto)
        {
            var response = new Response();
            var groupToUpdate = _dataContext
                .Groups
                .FirstOrDefault(group => group.Id == id);
            if (groupToUpdate == null)
            {
                response.AddError("id", "Group not found.");
                return BadRequest(response);
            }

            groupToUpdate.Name = groupToUpdate.Name;
            groupToUpdate.Image = groupToUpdate.Image;
            _dataContext.SaveChanges();
            var groupToReturn = new GroupGetDto()
            {
                Id = groupToUpdate.Id,
                Name = groupToUpdate.Name,
                Image = groupToUpdate.Image
            };

            response.Data = groupToReturn;
            return Ok(response);
        }
        [HttpGet("{id:int}")]
        public IActionResult GetById([FromRoute] int id )
        {
            var response = new Response();
            var groupToReturn = _dataContext
                .Groups
                .Select(group => new GroupGetDto
                {
                Id = group.Id,
                Name = group.Name,
                Image = group.Image,
            })
                .FirstOrDefault(group => group.Id == id);
            if(groupToReturn == null)
            {
                response.AddError("id", "Order not found. ");
                return BadRequest(response);
            }
            response.Data = groupToReturn;
            return Ok(response);
        }
        [HttpDelete("{Id:int}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var response = new Response();
            var groupToDelete = _dataContext
                .Groups
                .FirstOrDefault(group => group.Id == id);
            if (groupToDelete == null)
            {
                response.AddError("id", "Group not found.");
                return BadRequest(response);
            }
            _dataContext.Remove(groupToDelete);
            _dataContext.SaveChanges();
            response.Data = true;
            return Ok(response);
        }
    }
}
