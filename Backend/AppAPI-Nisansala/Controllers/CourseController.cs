using AppAPI_Nisansala.Data;
using AppAPI_Nisansala.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AppAPI_Nisansala.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CourseController(AppDbContext context)
        {
            _context= context;  
        }
        // GET: api/<CourseController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetAllCourses()
        {
            return await _context.Courses.ToListAsync();
        }

        // GET api/<CourseController>/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Course>> Get(int id)
        {
           
                return await _context.Courses.FirstOrDefaultAsync(c => c.CourseId == id);
            
            
        }

        // POST api/<CourseController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Course>> CreateCourse([FromBody] Course course)
        {
            
                await _context.Courses.AddAsync(course);
                await _context.SaveChangesAsync();
                return course;
            
        }

        // PUT api/<CourseController>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Course>> Put(int id, [FromBody] Course course)
        {
            //var _course = await _courseService.GetCourse(id);
            var _course = _context.Courses.FirstOrDefault(c => c.CourseId == id);
            
                //_context.Entry(course).State = EntityState.Modified;
                _course.Title = string.IsNullOrEmpty(course.Title) ? _course.Title : course.Title;
                _course.Description = string.IsNullOrEmpty(course.Description) ? _course.Description : course.Description;
                _course.Price = (course.Price != 0) ? course.Price : _course.Price;
                await _context.SaveChangesAsync();
                
            
            
            //course = await _context.Courses.
            if (_course != null) return Ok($"Updated Course Successfully");

            return BadRequest("No Course found");
        }

        // DELETE api/<CourseController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Course>> Delete(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course != null)
            {
                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();
                return Ok(course);
            }
            return BadRequest();
        }
    }
}
