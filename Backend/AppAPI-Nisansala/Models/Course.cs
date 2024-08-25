using System.ComponentModel.DataAnnotations;

namespace AppAPI_Nisansala.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }
        [Required(ErrorMessage = "Course title required")]
        [StringLength(50, ErrorMessage = "Course title length can't be more than 50.")]
        public string Title { get; set; }
        
        public string Description { get; set; }

        [Required(ErrorMessage = "Course fee required")]
        public int Price { get; set; }
        
    }
}
