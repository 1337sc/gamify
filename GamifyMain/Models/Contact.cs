namespace GamifyMain.Models
{
    public class Contact
    {
        public int Id { get; set; }

        public int FirstUserId { get; set; }

        public User FirstUser { get; set; }

        public int SecondUserId { get; set; }

        public User SecondUser { get; set; }
    }
}