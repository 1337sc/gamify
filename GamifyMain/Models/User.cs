﻿using System.Collections.Generic;

namespace GamifyMain.Models
{
    public class User
    {
        public int? Id { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }

        public List<UserWishedGame> UserWishedGames { get; set; }

        public List<Contact> Contacts { get; set; }
    }
}
