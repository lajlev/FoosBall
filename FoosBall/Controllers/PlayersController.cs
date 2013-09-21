﻿namespace FoosBall.Controllers
{
    using System.Linq;
    using System.Web.Mvc;
    using Models.Domain;
    using Models.ViewModels;
    using MongoDB.Driver.Builders;

    public class PlayersController : BaseController
    {
        public ActionResult Index()
        {
            var playerCollection = Dbh.GetCollection<Player>("Players")
                                        .FindAll()
                                        .SetSortOrder(SortBy.Descending("Rating"))
                                        .Where(x => x.Played > 0 && x.Deactivated == false)
                                        .ToList();

            return View(new PlayersViewModel { AllPlayers = playerCollection });
        }

        public ActionResult GetPlayers()
        {
            var playerCollection = Dbh.GetCollection<Player>("Players")
                                        .FindAll()
                                        .SetSortOrder(SortBy.Descending("Rating"))
                                        .Where(x => x.Played > 0 && x.Deactivated == false)
                                        .ToList();

            return Json(playerCollection, JsonRequestBehavior.AllowGet);
        }
    }
}